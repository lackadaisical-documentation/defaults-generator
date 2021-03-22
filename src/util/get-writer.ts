/**
 *
 * BEGIN HEADER
 *
 * Contains:    Get Writer function
 * CVM-Role:    <none>
 * Maintainer:  Matt Jolly
 * License:     GNU GPL v3
 *
 * Description: This function determines the pandoc writer to invoke for a given file extension.
 *              Informed by jgm/Pandoc/src/Text/Pandoc/Writers.hs
 *
 * END HEADER
 */

/**
 *  Function to determine the pandoc writer to invoke, based on the file extension of the output file.
 *
 *  Based on Text.Pandoc.App.FormatHeuristics
 *
 * @param   {string}  extension   File extension that we want a writer for.
 *
 * @returns {string}              The pandoc writer for this file extension.
 */
export default function getWriter(extension: string): string | undefined {
  let writer: string | undefined
  if (/\.[1-9]{1}/.test(extension)) {
    writer = 'man'
  } else {
    switch (extension.toLowerCase()) {
      case '.adoc':
        writer = 'asciidoc'
        break
      case '.asciidoc':
        writer = 'asciidoc'
        break
      case '.context':
        writer = 'context'
        break
      case '.ctx':
        writer = 'context'
        break
      case '.db':
        writer = 'docbook'
        break
      case '.doc':
        writer = 'doc'
        break
      case '.docx':
        writer = 'docx'
        break
      case '.dokuwiki':
        writer = 'dokuwiki'
        break
      case '.epub':
        writer = 'epub'
        break
      case '.fb2':
        writer = 'fb2'
        break
      case '.htm':
        writer = 'html'
        break
      case '.html':
        writer = 'html'
        break
      case '.icml':
        writer = 'icml'
        break
      case '.json':
        writer = 'json'
        break
      case '.latex':
        writer = 'latex'
        break
      case '.lhs':
        writer = 'markdown+lhs'
        break
      case '.ltx':
        writer = 'latex'
        break
      case '.markdown':
        writer = 'markdown'
        break
      case '.md':
        writer = 'markdown'
        break
      case '.ms':
        writer = 'ms'
        break
      case '.muse':
        writer = 'muse'
        break
      case '.native':
        writer = 'native'
        break
      case '.odt':
        writer = 'odt'
        break
      case '.opml':
        writer = 'opml'
        break
      case '.org':
        writer = 'org'
        break
      case '.pdf':
        writer = 'pdf'
        break
      case '.pptx':
        writer = 'pptx'
        break
      case '.roff':
        writer = 'ms'
        break
      case '.rst':
        writer = 'rst'
        break
      case '.rtf':
        writer = 'rtf'
        break
      case '.s5':
        writer = 's5'
        break
      case '.t2t':
        writer = 't2t'
        break
      case '.tei':
        writer = 'tei'
        break
      case '.tei.xml':
        writer = 'tei'
        break
      case '.tex':
        writer = 'latex'
        break
      case '.texi':
        writer = 'texinfo'
        break
      case '.texinfo':
        writer = 'texinfo'
        break
      case '.text':
        writer = 'markdown'
        break
      case '.textile':
        writer = 'textile'
        break
      case '.txt':
        writer = 'markdown'
        break
      case '.wiki':
        writer = 'mediawiki'
        break
      case '.xhtml':
        writer = 'html'
        break
      case '.ipynb':
        writer = 'ipynb'
        break
      case '.csv':
        writer = 'csv'
        break
      case '.bib':
        writer = 'biblatex'
        break
      default:
        writer = undefined
        break
    }
  }
  return writer
}
