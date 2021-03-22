/* eslint-disable quotes */
/**
 *
 * BEGIN HEADER
 *
 * Contains:        Pandoc defaults file JSON Schema
 * CVM-Role:        <none>
 * Maintainer:      Matt Jolly
 * License:         GNU GPL v3
 *
 * Description:     Contains a schema that a pandoc defaults file (or frontmatter input) can be validated against.
 *
 * END HEADER
 */

import { JSONSchemaType } from 'ajv'

// pandoc --list-input-formats (pandoc 2.11.0.2)
const readers = [
  'biblatex',
  'bibtex',
  'commonmark',
  'commonmark_x',
  'creole',
  'csljson',
  'csv',
  'docbook',
  'docx',
  'dokuwiki',
  'epub',
  'fb2',
  'gfm',
  'haddock',
  'html',
  'ipynb',
  'jats',
  'jira',
  'json',
  'latex',
  'man',
  'markdown',
  'markdown_github',
  'markdown_mmd',
  'markdown_phpextra',
  'markdown_strict',
  'mediawiki',
  'muse',
  'native',
  'odt',
  'opml',
  'org',
  'rst',
  't2t',
  'textile',
  'tikiwiki',
  'twiki',
  'vimwiki',
]

// pandoc --list-output-formats (pandoc 2.11.0.2)
const writers = [
  'asciidoc',
  'asciidoctor',
  'beamer',
  'commonmark',
  'commonmark_x',
  'context',
  'csljson',
  'docbook',
  'docbook4',
  'docbook5',
  'docx',
  'dokuwiki',
  'dzslides',
  'epub',
  'epub2',
  'epub3',
  'fb2',
  'gfm',
  'haddock',
  'html',
  'html4',
  'html5',
  'icml',
  'ipynb',
  'jats',
  'jats_archiving',
  'jats_articleauthoring',
  'jats_publishing',
  'jira',
  'json',
  'latex',
  'man',
  'markdown',
  'markdown_github',
  'markdown_mmd',
  'markdown_phpextra',
  'markdown_strict',
  'mediawiki',
  'ms',
  'muse',
  'native',
  'odt',
  'opendocument',
  'opml',
  'org',
  'pdf',
  'plain',
  'pptx',
  'revealjs',
  'rst',
  'rtf',
  's5',
  'slideous',
  'slidy',
  'tei',
  'texinfo',
  'textile',
  'xwiki',
  'zimwiki',
]

const pdfEngines = [
  'pdflatex',
  'lualatex',
  'xelatex',
  'latexmk',
  'tectonic',
  'wkhtmltopdf',
  'weasyprint',
  'prince',
  'context',
  'pdfroff',
]

/* ajv's JSONSchemaType doesn't support unions yet, so in the short term there are some limitations:
 *  bibliography: string | Array<string>
 *  css: string | Array<string>
 *  epub-fonts: string | Array<string>
 */
type PandocDefaults = {
  abbreviations: string
  ascii: boolean
  'atx-headers': boolean
  bibliography: string
  'citation-abbreviations': string
  'cite-method': string
  citeproc: boolean
  columns: number
  csl: string
  css: string
  'data-dir': string
  'default-image-extension': string
  dpi: number
  'dump-args': boolean
  'email-obfuscation': string
  eol: string
  'epub-chapter-level': number
  'epub-cover-image': string
  'epub-fonts': Array<string>
  'epub-metadata': string
  'epub-subdirectory': string
  'extract-media': string
  'fail-if-warnings': boolean
  'file-scope': boolean
  filters: Array<string>
  'highlight-style': string
  'html-math-method': {
    method: string
    url: string
  }
  'html-q-tags': boolean
  'identifier-prefix': string
  'ignore-args': boolean
  'include-after-body': Array<string>
  'include-before-body': Array<string>
  'include-in-header': Array<string>
  incremental: boolean
  'indented-code-classes': Array<string>
  'input-file': string
  'input-files': Array<string>
  listings: boolean
  'log-file': string
  metadata: {
    bibliography: string
    csl: string
    'citation-abbreviations': string
    'reference-section-title': string
    'suppress-biblogrpahy': boolean
    'citation-style': string
  }
  'metadata-file': string
  'metadata-files': Array<string>
  'number-offset': Array<number>
  'number-sections': boolean
  'output-file': string
  'pdf-engine-opt': string
  'pdf-engine-opts': Array<string>
  'pdf-engine': string
  'preserve-tabs': boolean
  reader: string
  'reference-doc': string
  'reference-links': boolean
  'reference-location': string
  'request-headers': Array<string[]>
  'resource-path': Array<string>
  'section-divs': boolean
  'self-contained': boolean
  'shift-heading-level-by': number
  'slide-level': number
  standalone: boolean
  'strip-comments': boolean
  'syntax-definitions': Array<string>
  'tab-stop': number
  'table-of-contents': boolean
  template: string
  'title-prefix': string
  'toc-depth': number
  toc: boolean
  'top-level-division:': string
  trace: boolean
  'track-changes': string
  variables: Record<string, unknown>
  verbosity: string
  wrap: string
  writer: string
}

/*
 * JSONSchema for AJV
 * Informed by https://github.com/jgm/pandoc/issues/5990, https://github.com/Zettlr/Zettlr/issues/1640, and the pandoc manual.
 * Thanks to:
 * John MacFarlane https://github.com/jgm
 * Carsten Allefeld https://github.com/allefeld
 * Pranesh Prakash https://github.com/the-solipsist
 * Albert Krewinkel https://github.com/tarleb
 */
const defaultsSchema: JSONSchemaType<PandocDefaults> = {
  type: 'object',
  required: [],
  properties: {
    abbreviations: {
      description: 'Specifies a custom abbreviations file, with abbreviations one to a line.',
      type: 'string',
    },
    ascii: {
      description: 'Use only ASCII characters in output.',
      type: 'boolean',
    },
    'atx-headers': {
      description: 'Use ATX headers for levels 1 and 2.',
      type: 'boolean',
    },
    bibliography: {
      description: 'Set the bibliography field in the document’s metadata.',
      type: 'string',
    },
    'citation-abbreviations': {
      description:
        'May be used to specify a JSON file containing abbreviations of journals that should be used in formatted bibliographies when form="short" is specified.',
      type: 'string',
      format: 'uri-reference',
    },
    'cite-method': {
      enum: ['citeproc', 'natbib', 'biblatex'],
      type: 'string',
    },
    citeproc: {
      type: 'boolean',
    },
    columns: {
      description:
        'Specify length of lines in characters. This affects text wrapping in the generated source code. It also affects calculation of column widths for plain text tables.',
      type: 'number',
    },
    csl: {
      description: 'Set the csl field in the document’s metadata.',
      type: 'string',
    },
    css: {
      description: 'Link to a CSS style sheet.',
      format: 'uri-reference',
      type: 'string',
    },
    'data-dir': {
      description: 'Specify the user data directory to search for pandoc data files.',
      type: 'string',
    },
    'default-image-extension': {
      description: 'Specify a default extension to use when image paths/URLs have no extension.',
      maxLength: 5,
      minLength: 3,
      type: 'string',
    },
    dpi: {
      default: 96,
      description:
        'Specify the default dpi (dots per inch) value for conversion from pixels to inch/centimeters and vice versa.',
      type: 'number',
    },
    'dump-args': {
      description: 'Print information about command-line arguments to stdout, then exit.',
      type: 'boolean',
    },
    'email-obfuscation': {
      default: 'none',
      description: 'Specify a method for obfuscating mailto: links in HTML documents.',
      enum: ['none', 'javascript', 'references'],
      type: 'string',
    },
    eol: {
      description: 'Manually specify line endings',
      enum: ['lf', 'crlf', 'native'],
      type: 'string',
    },
    'epub-chapter-level': {
      default: 1,
      description: 'Specify the heading level at which to split the EPUB into separate “chapter” files.',
      maximum: 5,
      minimum: 1,
      type: 'number',
    },
    'epub-cover-image': {
      description: 'Use the specified image as the EPUB cover.',
      type: 'string',
    },
    'epub-fonts': {
      description: 'Embed the specified font in the EPUB.',
      type: 'array',
      items: {
        type: 'string',
      },
    },
    'epub-metadata': {
      description: 'Look in the specified XML file for metadata for the EPUB.',
      type: 'string',
    },
    'epub-subdirectory': {
      description: 'Specify the subdirectory in the OCF container that is to hold the EPUB-specific contents.',
      type: 'string',
    },
    'extract-media': {
      description:
        'Extract images and other media contained in or linked from the source document to the path DIR, creating it if necessary, and adjust the images references in the document so they point to the extracted files.',
      type: 'string',
    },
    'fail-if-warnings': {
      description: 'Exit with error status if there are any warnings.',
      type: 'boolean',
    },
    'file-scope': {
      description: 'Parse each file individually before combining for multifile documents.',
      type: 'boolean',
    },
    filters: {
      description:
        'Specify an executable to be used as a filter transforming the pandoc AST after the input is parsed and before the output is written.',
      type: 'array',
      items: {
        format: 'uri-reference',
        type: 'string',
      },
    },
    'highlight-style': {
      default: 'pygments',
      description:
        'Specifies the coloring style to be used in highlighted source code. Instead of a STYLE name, a JSON file with extension .theme may be supplied.',
      type: 'string',
    },
    'html-math-method': {
      description: 'Method use to display mathematics in HTML',
      properties: {
        method: {
          enum: ['mathjax', 'katex', 'gladtex', 'mathml'],
          type: 'string',
        },
        url: {
          format: 'uri',
          type: 'string',
        },
      },
      required: ['method', 'url'],
      type: 'object',
    },
    'html-q-tags': {
      description: 'Use <q> tags for quotes in HTML.',
      type: 'boolean',
    },
    'identifier-prefix': {
      description:
        'Specify a prefix to be added to all identifiers and internal links in HTML and DocBook output, and to footnote numbers in Markdown and Haddock output.',
      type: 'string',
    },
    'ignore-args': {
      description: 'Ignore command-line arguments (for use in wrapper scripts)',
      type: 'boolean',
    },
    'include-after-body': {
      description: 'Include contents of FILE, verbatim, at the end of the document body.',
      type: 'array',
      items: {
        format: 'uri-reference',
        type: 'string',
      },
    },
    'include-before-body': {
      description: 'Include contents of FILE, verbatim, before the document body.',
      type: 'array',
      items: {
        format: 'uri-reference',
        type: 'string',
      },
    },
    'include-in-header': {
      description: 'Include contents of FILE, verbatim, at the end of the header.',
      type: 'array',
      items: {
        format: 'uri-reference',
        type: 'string',
      },
    },
    incremental: {
      default: false,
      description: 'Make list items in slide shows display incrementally (one by one).',
      type: 'boolean',
    },
    'indented-code-classes': {
      description: 'Specify classes to use for indented code blocks',
      type: 'array',
      items: {
        format: 'uri-reference',
        type: 'string',
      },
    },
    'input-file': {
      description: 'Path to a single file to process.',
      type: 'string',
    },
    'input-files': {
      description: 'List of file paths to process.',
      items: {
        format: 'uri-reference',
        type: 'string',
      },
      type: 'array',
      uniqueItems: true,
    },
    listings: {
      default: false,
      description: 'Use the listings package for LaTeX code blocks.',
      type: 'boolean',
    },
    'log-file': {
      description: 'Write log messages in machine-readable JSON format to FILE.',
      type: 'string',
      format: 'uri-reference',
    },
    metadata: {
      description: 'Set the metadata field KEY to the value VAL.',
      required: [],
      type: 'object',
      properties: {
        bibliography: {
          type: 'string',
        },
        'citation-abbreviations': {
          description:
            'May be used to specify a JSON file containing abbreviations of journals that should be used in formatted bibliographies when form="short" is specified.',
          type: 'string',
          format: 'uri-reference',
        },
        'citation-style': {
          format: 'url',
          type: 'string',
        },
        csl: {
          format: 'url',
          type: 'string',
        },
        'reference-section-title': {
          description: 'Section heading for bibliography.',
          type: 'string',
        },
        'suppress-biblogrpahy': {
          default: false,
          description: 'Suppress generation of the bibliography.',
          type: 'boolean',
        },
      },
    },
    'metadata-file': {
      description: 'Read metadata from the supplied YAML (or JSON) file.',
      format: 'uri-reference',
      type: 'string',
    },
    'metadata-files': {
      description: 'List of files to read metadata from. (YAML (or JSON)).',
      items: {
        format: 'uri-reference',
        type: 'string',
      },
      type: 'array',
    },
    'number-offset': {
      description: 'Offset for section headings in HTML output (ignored in other output formats). ',
      type: 'array',
      items: {
        type: 'number',
      },
    },
    'number-sections': {
      description: 'Number section headings in LaTeX, ConTeXt, HTML, Docx, ms, or EPUB output.',
      type: 'boolean',
    },
    'output-file': {
      description: 'Write output to FILE instead of stdout',
      type: 'string',
    },
    'pdf-engine': {
      description: 'Use the specified engine when producing PDF output.',
      enum: pdfEngines,
      type: 'string',
    },
    'pdf-engine-opt': {
      description: 'Use the given string as a command-line argument to the pdf-engine.',
      type: 'string',
    },
    'pdf-engine-opts': {
      description: 'List of strings to be used as command-line arguments to the pdf-engine.',
      type: 'array',
      items: {
        type: 'string',
      },
    },
    'preserve-tabs': {
      default: false,
      description: 'Preserve tabs instead of converting them to spaces.',
      type: 'boolean',
    },
    reader: {
      description: 'Specify output format.',
      enum: readers,
      type: 'string',
    },
    'reference-doc': {
      description: 'Use the specified file as a style reference in producing a docx or ODT file.',
      type: 'string',
    },
    'reference-links': {
      description: 'Use reference-style links, rather than inline links, in writing Markdown or reStructuredText.',
      type: 'boolean',
    },
    'reference-location': {
      description: 'Specify where footnotes (and references, if reference-links is set) are placed.',
      enum: ['block', 'section', 'document'],
      type: 'string',
    },
    'request-headers': {
      description: 'A list of two-element lists',
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    'resource-path': {
      description: 'List of paths to search for images and other resources.',
      type: 'array',
      items: {
        format: 'uri-reference',
        type: 'string',
      },
    },
    'section-divs': {
      description:
        'Wrap sections in <section> tags (or <div> tags for html4), and attach identifiers to the enclosing <section> (or <div>) rather than the heading itself.',
      type: 'boolean',
    },
    'self-contained': {
      default: false,
      description:
        'Produce a standalone HTML file with no external dependencies, using data: URIs to incorporate the contents of linked scripts, stylesheets, images, and videos.',
      type: 'boolean',
    },
    'shift-heading-level-by': {
      description: 'Shift heading levels by a positive or negative integer.',
      type: 'number',
    },
    'slide-level': {
      description: 'Specifies that headings with the specified level create slides.',
      maximum: 5,
      minimum: 1,
      type: 'number',
    },
    standalone: {
      default: false,
      description:
        'Produce output with an appropriate header and footer (e.g. a standalone HTML, LaTeX, TEI, or RTF file, not a fragment).',
      type: 'boolean',
    },
    'strip-comments': {
      description:
        'Strip out HTML comments in the Markdown or Textile source, rather than passing them on to Markdown, Textile or HTML output as raw HTML.',
      type: 'boolean',
    },
    'syntax-definitions': {
      description:
        'Instructs pandoc to load a KDE XML syntax definition file, which will be used for syntax highlighting of appropriately marked code blocks.',
      type: 'array',
      items: {
        format: 'uri-reference',
        type: 'string',
      },
    },
    'tab-stop': {
      default: 4,
      description: 'Specify the number of spaces per tab.',
      type: 'number',
    },
    'table-of-contents': {
      default: false,
      description:
        'Include an automatically generated table of contents (or an instruction to create one) in the output document.',
      type: 'boolean',
    },
    template: {
      description: 'Use the specified file as a custom template for the generated document. Implies --standalone.',
      type: 'string',
    },
    'title-prefix': {
      description:
        'Specify STRING as a prefix at the beginning of the title that appears in the HTML header (but not in the title as it appears at the beginning of the HTML body). Implies --standalone.',
      type: 'string',
    },
    toc: {
      default: false,
      description:
        'Include an automatically generated table of contents (or an instruction to create one) in the output document.',
      type: 'boolean',
    },
    'toc-depth': {
      description: 'Level of section to include in table of contents',
      maximum: 5,
      minimum: 1,
      type: 'number',
    },
    'top-level-division:': {
      description: 'Treat top-level headings as the given division type in LaTeX, ConTeXt, DocBook, and TEI output.',
      enum: ['default', 'section', 'chapter', 'part'],
      type: 'string',
    },
    trace: {
      type: 'boolean',
    },
    'track-changes': {
      description: 'Treat top-level headings as the given division type in LaTeX, ConTeXt, DocBook, and TEI output.',
      enum: ['accept', 'reject', 'all'],
      type: 'string',
    },
    variables: {
      description:
        'Set the template variable KEY to the value VAL when rendering the document in standalone mode. If no VAL is specified, the key will be given the value true.',
      type: 'object',
      required: [],
    },
    verbosity: {
      description: 'Set verbosity of pandoc.',
      enum: ['INFO', 'WARNING', 'ERROR'],
      type: 'string',
    },
    wrap: {
      default: 'auto',
      description: 'Determine how text is wrapped in the output (the source code, not the rendered version).',
      enum: ['auto', 'none', 'preserve'],
      type: 'string',
    },
    writer: {
      description: 'Specify output format.',
      enum: writers,
      type: 'string',
    },
  },
}

export default defaultsSchema
