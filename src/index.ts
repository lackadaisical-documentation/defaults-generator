/**
 * BEGIN HEADER
 *
 * Contains:    Create Defaults File command
 * CVM-Role:    <none>
 * Maintainer:  Matt Jolly
 * License:     GNU GPL v3
 *
 * Description:   This command creates a pandoc defaults file from an input object(s).
 *
 * END HEADER
 */

import * as _ from 'lodash'
import Ajv, { DefinedError } from 'ajv'
import addFormats from 'ajv-formats'
import path from 'path'

import getWriter from './util/get-writer'
import defaultsSchema from './util/pandoc-schema'

/**
 * Interface for a pandoc defaults file.
 * As input and output is validated by the JSONSchema, we don't need to be too specific here.
 */
export interface defaultsFile extends Record<string, unknown> {
  'output-file'?: string
  writer?: string
  metadata?: {
    bibliography?: string
    csl?: string
    'citation-abbreviations'?: string
    'reference-section-title'?: string
    'suppress-biblogrpahy'?: boolean
    'citation-style'?: string
  }
  variables?: Record<string, unknown>
}

/**
 *  Function to determine if a property is a default 'defaults' property.
 *  If it has an entry in the schema, it's a default property.
 *
 * @param   {string}  property    Property that we want to know about.
 *
 * @returns {boolean} Whether or not this is a default property.
 */
export function isDefaultsKey(property: string): boolean {
  return Object.prototype.hasOwnProperty.call(defaultsSchema.properties, property) ? true : false
}

/**
 * Function to assign keys to their final home.
 *
 * @param   {object}  obj   Properties to assign.
 *
 * @returns {object}        Processed object
 */
function assignKeys(obj: Record<string, unknown>): defaultsFile {
  const properties: Record<string, unknown> = {
    metadata: {},
    variables: {},
  }
  const metadataValues: Record<'metadata', Record<string, unknown>> = {
    metadata: {},
  }
  const variableValues: Record<'variables', Record<string, unknown>> = {
    variables: {},
  }
  for (const key in obj) {
    const value = obj[key]
    if (key === 'metadata' && typeof value === typeof obj) {
      const metadataKeys = value as Record<string, unknown>
      for (const metadataKey in metadataKeys) {
        const metadataValue = metadataKeys[metadataKey]
        metadataValues.metadata[metadataKey] = metadataValue
      }
    } else if (key === 'variables' && typeof value === typeof obj) {
      const variableKeys = value as Record<string, unknown>
      for (const variableKey in variableKeys) {
        const variableValue = variableKeys[variableKey]
        variableValues.variables[variableKey] = variableValue
      }
    } else if (typeof value === typeof obj) {
      const objKeys = assignKeys(value as Record<string, unknown>)
      for (const objKey in objKeys) {
        properties[objKey] = objKeys[objKey]
      }
    } else {
      properties[key] = value
    }
  }
  const combinedProperties: defaultsFile = _.merge(properties, metadataValues, variableValues)
  return combinedProperties
}

/**
 * @param   {string}  key The key that we need to know about
 * @returns {boolean}     Whether the key needs to be handled as a special case.
 */
function isSpecialKey(key: string): boolean {
  /**
   * Special Cases: Some of the keys below may be root keys OR metadata values; Setting them in the root sets the metadata key under-the-hood, and it's more explicit when reading output.
   * Others **must** be metadata values (e.g. `citation-style`, `reference-section-title`)
   * See https://groups.google.com/g/pandoc-discuss/c/tqMp0UKPpZQ/m/lay3hDAVBwAJ && https://github.com/Zettlr/Zettlr/issues/1640
   */
  const specialKeys = [
    'bibliography',
    'csl',
    'citation-abbreviations',
    'reference-section-title',
    'suppress-bibliography',
    'citation-style',
  ]
  return specialKeys.includes(key)
}

/**
 * Function that processes an object's keys into a pandoc defaults file.
 *
 * @param   {object}  keys    Keys that we want processed.
 *
 * @returns {object}                Processed Keys
 */
export function processKeys(keys: Record<string, unknown>): defaultsFile {
  const processedKeys: defaultsFile = {
    metadata: {},
    variables: {},
  }
  const metadataKeys: Record<'metadata', Record<string, unknown>> = {
    metadata: {},
  }

  const variablesKeys: Record<'variables', Record<string, unknown>> = {
    variables: {},
  }
  const flatKeys: defaultsFile = assignKeys(keys)
  for (const key in flatKeys) {
    const value = flatKeys[key]
    if (key === ('table-of-contents' || 'toc')) {
      // This must be set as a root key to be consistent across formats.
      processedKeys[key] = value
    } else if (isDefaultsKey(key) && !isSpecialKey(key)) {
      processedKeys[key] = value
    } else if (isSpecialKey(key)) {
      metadataKeys.metadata[key] = value
    } else {
      // Variables values aren't escaped, so we should use them to fill in template variables, rather than metadata.
      variablesKeys.variables[key] = value
    }
  }
  const defaultsContent: defaultsFile = _.merge(processedKeys, variablesKeys, metadataKeys)
  return defaultsContent
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 *  Function to validate values against the schema.
 *
 * @param   {object}  properties    Object that we need to validate.
 *
 */
export function validateAgainstSchema(properties: Record<string, unknown> | defaultsFile): void {
  const ajv = new Ajv()
  addFormats(ajv)
  const validator = ajv.compile(defaultsSchema)
  if (!validator(properties)) {
    for (const err of validator.errors as DefinedError[]) {
      console.error(err)
    }
    throw new ValidationError('Validation against schema returned errors.')
  }
}

interface DefaultsInterface {
  additionalConfig?: Record<string, unknown>
  projectSettings?: Record<string, unknown>
  outputFile?: string
  writer?: string
}

/**
 *
 *  Function to provide the content for a pandoc defaults file.
 *
 * @param  {object}  frontmatter             Frontmatter that we want to parse.
 * @param  {object}  param0                  Destructured paramater object.
 * @param  {object}  param0.additionalConfig Additional metadata / configuration object.
 * @param  {object}  param0.projectSettings  Base configuration object for customisation.
 * @param  {object}  param0.outputFile       Optional string to specify output file path (overrides object input)
 * @param  {string}  param0.writer           Pandoc writer to use if you don't want the tool to try and work it out automagically.
 *
 * @returns {object}                 A valid pandoc defaults file.
 */
export default function makeDefaultsFile(
  frontmatter = {},
  {
    additionalConfig = undefined,
    projectSettings = undefined,
    outputFile = undefined,
    writer = undefined,
  }: DefaultsInterface = {}
): defaultsFile {
  validateAgainstSchema(frontmatter)
  let defaultsFileContents: defaultsFile

  // Precedence: frontmatter > additionalConfig > projectSettings
  if (additionalConfig && projectSettings) {
    defaultsFileContents = _.merge(
      processKeys(projectSettings),
      processKeys(additionalConfig),
      processKeys(frontmatter)
    )
  } else if (additionalConfig) {
    defaultsFileContents = _.merge(processKeys(additionalConfig), processKeys(frontmatter))
  } else if (projectSettings) {
    defaultsFileContents = _.merge(processKeys(projectSettings), processKeys(frontmatter))
  } else {
    defaultsFileContents = processKeys(frontmatter)
  }

  // An explicitly passed outputFile should override user input to prevent abuse of pandoc
  if (outputFile) {
    defaultsFileContents['output-file'] = path.resolve(outputFile)
  }

  if (writer) {
    defaultsFileContents.writer = writer
  } else if (defaultsFileContents['output-file']) {
    defaultsFileContents.writer = getWriter(path.extname(defaultsFileContents['output-file']))
  }

  validateAgainstSchema(defaultsFileContents)

  return defaultsFileContents
}
