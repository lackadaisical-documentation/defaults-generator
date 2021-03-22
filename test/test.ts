/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use strict'

process.env.NODE_ENV = 'test'

import test from 'ava'
import YAML from 'yaml'
import fs from 'fs'
import path from 'path'

import makeDefaultsFile from '../src/index'

import { validateAgainstSchema } from '../src/index'
import { isDefaultsKey } from '../src/index'
import { processKeys } from '../src/index'
import getWriter from '../src/util/get-writer'

// eslint-disable-next-line no-undef
process.chdir('./test')

test('Valid Pandoc defaults file passes JSONSchema validation', (t) => {
  const data = YAML.parse(fs.readFileSync(path.resolve('./defaults.yaml'), 'utf-8'))
  t.notThrows(() => {
    validateAgainstSchema(data), 'Validation against schema returned errors.'
  })
})

test('getWriter returns correct value for PDF', (t) => {
  const fileext = path.extname('/test/path/to/file.pdf')
  const writer = getWriter(fileext)
  t.true(writer === 'pdf')
})

test('getWriter returns correct value for HTML', (t) => {
  // Simulate a real filename and snip the extension like we would in the main function
  const fileext = path.extname('/test/path/to/file.html')
  const writer = getWriter(fileext)
  t.true(writer === 'html')
})

test('getWriter returns correct value for DOCX', (t) => {
  // Simulate a real filename and snip the extension like we would in the main function
  const fileext = path.extname('/test/path/to/file.docx')
  const writer = getWriter(fileext)
  t.true(writer === 'docx')
})

test('getWriter returns correct value for PPTX', (t) => {
  // Simulate a real filename and snip the extension like we would in the main function
  const fileext = path.extname('/test/path/to/file.pptx')
  const writer = getWriter(fileext)
  t.true(writer === 'pptx')
})

test('getWriter returns undefined for unknown format', (t) => {
  // Simulate a real filename and snip the extension like we would in the main function
  const fileext = path.extname('/test/path/to/file.potato')
  const writer = getWriter(fileext)
  t.true(writer === undefined)
})

test('isDefaultsKey returns true for default properties', (t) => {
  const property = 'output-file'
  t.true(isDefaultsKey(property))
})

test('isDefaultsKey returns false for custom properties', (t) => {
  const property = 'title'
  t.false(isDefaultsKey(property))
})

test('makeDefaultsFile throws an error with invalid input', (t) => {
  const frontmatter = YAML.parse(fs.readFileSync('./invalid-frontmatter.yaml', 'utf-8'))
  const error = t.throws(() => {
    makeDefaultsFile(frontmatter), t.is(error.message, 'Validation against schema returned errors.')
  })
})

test('makeDefaultsFile returns appropriate writer when presented with output-file', (t) => {
  const frontmatter = YAML.parse(fs.readFileSync('./output-file.yaml', 'utf-8'))
  const output = makeDefaultsFile(frontmatter)
  t.true(output.writer === 'pdf')
})

test('processKeys places default value in root of object', (t) => {
  const property = {
    writer: 'pdf',
  }
  const output = processKeys(property)
  t.true(output.writer === 'pdf')
})

test('processKeys places special case in object.metadata', (t) => {
  const property = {
    csl: 'https://www.zotero.org/styles/vancouver-superscript',
  }
  const output = processKeys(property)
  t.true(
    Object.prototype.hasOwnProperty.call(output.metadata, 'csl') &&
      output.metadata?.csl === 'https://www.zotero.org/styles/vancouver-superscript'
  )
})

test('processKeys places custom property in object.variables', (t) => {
  const property = {
    'custom-property': 'this-is-a-custom-property-string',
  }

  const output = processKeys(property)
  t.true(Object.prototype.hasOwnProperty.call(output.variables, 'custom-property'))
})

test('Invalid writer fails schema validation', (t) => {
  const data = {
    writer: 'not-a-real-writer',
  }
  const error = t.throws(() => {
    makeDefaultsFile(data), t.is(error.message, 'Validation against schema returned errors.')
  })
})

test('Valid writer passes schema validation', (t) => {
  const data = {
    writer: 'html',
  }
  t.notThrows(() => {
    makeDefaultsFile(data), 'Validation against schema returned errors.'
  })
})

test('Invalid reader fails schema validation', (t) => {
  const data = {
    reader: 'not-a-real-reader',
  }
  const error = t.throws(() => {
    makeDefaultsFile(data), t.is(error.message, 'Validation against schema returned errors.')
  })
})

test('Valid reader passes schema validation', (t) => {
  const data = {
    reader: 'html',
  }
  t.notThrows(() => {
    makeDefaultsFile(data), 'Validation against schema returned errors.'
  })
})

test('variables are placed in output object correctly', (t) => {
  const data = {
    variables: {
      'test-variable': 'test variable',
    },
  }

  const output = makeDefaultsFile(data)
  t.true(Object.prototype.hasOwnProperty.call(output.variables, 'test-variable'))
})

test('Explicit metadata is placed in output object correctly', (t) => {
  const data = {
    metadata: {
      'test-metadata': 'test metadata',
    },
  }
  const output = makeDefaultsFile(data)
  t.true(Object.prototype.hasOwnProperty.call(output.metadata, 'test-metadata'))
})

test('Explicit outputFile passed to makeDefaultsFile overrides yaml input', (t) => {
  const outputFile = '../output.pdf'
  const data = {
    'output-file': 'user specified',
  }
  const output = makeDefaultsFile(data, { outputFile: path.resolve(outputFile) })
  t.true(output['output-file'] === path.resolve(outputFile))
})

test('Explicit writer passed to makeDefaultsFile overrides yaml input', (t) => {
  const data = {
    writer: 'pdf',
  }

  const output = makeDefaultsFile(data, { writer: 'html' })
  t.true(output.writer === 'html')
})

test('Custom metadata objects are accepted', (t) => {
  const data = {
    title: 'Additional Config Title',
  }
  const output = makeDefaultsFile({}, { additionalConfig: data })
  t.true(output.variables?.title === 'Additional Config Title')
})

test('Custom metadata values are overridden by in-document values', (t) => {
  const data = {
    title: 'Additional Config Title',
  }
  const output = makeDefaultsFile({ title: 'Standard Title' }, { additionalConfig: data })
  t.true(output.variables?.title === 'Standard Title')
})

test('Custom metadata overrides base configuration', (t) => {
  const additionalConfig = {
    variables: {
      title: 'Additional Config Title',
    },
  }
  const pandocBase = {
    variables: {
      title: 'Default Title',
    },
  }
  const output = makeDefaultsFile({}, { additionalConfig: additionalConfig, projectSettings: pandocBase })
  t.true(output.variables?.title === 'Additional Config Title')
})

test('toc is output as a root key', (t) => {
  const output = makeDefaultsFile({ toc: true })
  t.true(output.toc === true)
})

test('table-of-contents is output as a root key', (t) => {
  const output = makeDefaultsFile({ 'table-of-contents': true })
  t.true(output['table-of-contents'] === true)
})

test('Keys that do not collide are preserved when properties merged', (t) => {
  const additionalConfig = {
    variables: {
      'title-page-background': '/working/resources/template_resources/lackadaisical_title.pdf',
    },
  }
  const output = makeDefaultsFile({ title: 'Custom Title' }, { additionalConfig: additionalConfig })
  t.true(
    output.variables?.title === 'Custom Title' &&
      output.variables['title-page-background'] === '/working/resources/template_resources/lackadaisical_title.pdf'
  )
})

test('Defaults keys are passed through', (t) => {
  const additionalConfig = {
    standalone: true,
    'self-contained': false,
  }
  const output = makeDefaultsFile({}, { additionalConfig: additionalConfig })
  t.true(output.standalone === true && output['self-contained'] === false)
})

test('Convoluted objects are parsed successfully', (t) => {
  const additionalConfig = {
    level1: {
      level2: {
        standalone: true,
        'self-contained': false,
      },
    },
  }
  const output = makeDefaultsFile({}, { additionalConfig: additionalConfig })
  t.true(output.standalone === true && output['self-contained'] === false)
})

test('Project settings can be passed without additionalConfig', (t) => {
  const additionalConfig = {
    standalone: true,
    'self-contained': false,
  }
  const output = makeDefaultsFile({}, { projectSettings: additionalConfig })
  t.true(output.standalone === true && output['self-contained'] === false)
})
