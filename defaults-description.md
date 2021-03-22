# Pandoc command line arguments & options in defaults files

Thanks to [Carsten Allefeld](https://github.com/jgm/pandoc/issues/5990#issuecomment-568303317)

Notes:

"(n/a)"
:   defaults version does not exist and would not make sense


| command line                          | defaults file                         |
|---------------------------------------|---------------------------------------|
| [FILE]                                | `input-file:` FILE                    |
| [FILES]                               | `input-files:`                        |
|                                       | `  - `FILE (for each file)            |
| `--from=`FORMAT[EXTENSIONS]           | `reader:` FORMAT[EXTENSIONS]          |
| `--to=`FORMAT[EXTENSIONS]             | `writer:` FORMAT[EXTENSIONS]          |
| `--output=`FILE                       | `output-file:` FILE                   |
| `--output=-`                          | `output-file:`                        |
| `--data-dir=`DIRECTORY                | `data-dir:` DIRECTORY                 |
| `--metadata=`KEY[`:`VALUE]            | `metadata:`                           |
|                                       | `  `KEY`:` VALUE\|`true`              |
| `--metadata-file=`FILE                | `metadata-files:`                     |
|                                       | `  - `FILE                            |
| `--defaults=`FILE                     | (n/a)                                 |
| `--file-scope`                        | `file-scope: true`                    |
| `--standalone`                        | `standalone: true`                    |
| `--template=`FILE                     | `template:` FILE                      |
| `--variable=`KEY[`:`VALUE]            | `variables:`                          |
|                                       | `  `KEY`:` VALUE\|`true`              |
| `--wrap=`VALUE                        | `wrap:` VALUE                         |
| `--ascii`                             | `ascii: true`                         |
| `--toc`                               | `toc: true`                           |
| `--toc-depth=`NUMBER                  | `toc-depth:` NUMBER                   |
| `--number-sections`                   | `number-sections: true`               |
| `--number-offset=`NUMBERS             | `number-offset:` NUMBERS (as list)    |
| `--top-level-division=`VALUE          | `top-level-division:` VALUE           |
| `--extract-media=`PATH                | `extract-media:` PATH                 |
| `--resource-path=`SEARCHPATH          | `resource-path:` SEARCHPATH (as list) |
| `--include-in-header=`FILE            | `include-in-header:`                  |
|                                       | `  - `FILE                            |
| `--include-before-body=`FILE          | `include-before-body:` FILEs          |
|                                       | `  - `FILE                            |
| `--include-after-body=`FILE           | `include-after-body:` FILEs           |
|                                       | `  - `FILE                            |
| `--no-highlight`                      | `highlight-style: null`               |
| `--highlight-style=`STYLE\|FILE       | `highlight-style:` STYLE\|FILE        |
| `--syntax-definition=`FILE            | `syntax-definitions:`                 |
|                                       | `  - `FILE                            |
| `--dpi=`NUMBER                        | `dpi:` NUMBER                         |
| `--eol=`VALUE                         | `eol:` VALUE                          |
| `--columns=`NUMBER                    | `columns:` NUMBER                     |
| `--preserve-tabs`                     | `preserve-tabs: true`                 |
| `--tab-stop=`NUMBER                   | `tab-stop:` NUMBER                    |
| `--pdf-engine=`PROGRAM                | `pdf-engine:` PROGRAM                 |
| `--pdf-engine-opt=`STRING             | `pdf-engine-opts:`                    |
|                                       | `  - `STRING                          |
| `--reference-doc=`FILE                | `reference-doc:` FILE                 |
| `--self-contained`                    | `self-contained: true`                |
| `--request-header=`NAME`:`VALUE       | `request-headers:`                    |
|                                       | `  - ["`NAME`", "`VALUE`"]`           |
| `--abbreviations=`FILE                | `abbreviations:` FILE                 |
| `--indented-code-classes=`STRING      | `indented-code-classes:`              |
|                                       | `  - `STRING                          |
| `--default-image-extension=`EXTENSION | `default-image-extension:` EXTENSION  |
| `--filter=`PROGRAM                    | `filters:`                            |
|                                       | `  - `PROGRAM                         |
| `--lua-filter=`SCRIPTPATH             | `filters:`                            |
|                                       | `  - path:` SCRIPTPATH                |
|                                       | `    type:` lua                       |
| `--filter citeproc`                   | `filters:`                            |
|                                       | ` - type: citeproc`                   |
| `--shift-heading-level-by=`NUMBER     | `shift-heading-level-by:` NUMBER      |
| `--track-changes=`VALUE               | `track-changes:` VALUE                |
| `--strip-comments`                    | `strip-comments: true`                |
| `--reference-links`                   | `reference-links: true`               |
| `--reference-location=`VALUE          | `reference-location:` VALUE           |
| `--atx-headers`                       | `atx-headers: true`                   |
| `--listings`                          | `listings: true`                      |
| `--incremental`                       | `incremental: true`                   |
| `--slide-level=`NUMBER                | `slide-level:` NUMBER                 |
| `--section-divs`                      | `section-divs: true`                  |
| `--html-q-tags`                       | `html-q-tags: true`                   |
| `--email-obfuscation=`VALUE           | `email-obfuscation:` VALUE            |
| `--id-prefix=`STRING                  | `identifier-prefix:` STRING           |
| `--title-prefix=`STRING               | `title-prefix:` STRING                |
| `--css=`URL                           | `css:`                                |
|                                       | `  - `URL                             |
| `--epub-subdirectory=`DIRNAME         | `epub-subdirectory:` DIRNAME          |
| `--epub-cover-image=`FILE             | `epub-cover-image:` FILE              |
| `--epub-metadata=`FILE                | `epub-metadata:` FILE                 |
| `--epub-embed-font=`FILE              | `epub-fonts:`                         |
|                                       | `  - `FILE                            |
| `--epub-chapter-level=`NUMBER         | `epub-chapter-level:` NUMBER          |
| `--ipynb-output=`VALUE                | `ipynb-output:` VALUE                 |
| `--bibliography=`FILE                 | `metadata:`                           |
|                                       | `  bibliography:` FILE                |
| `--csl=`FILE                          | `metadata:`                           |
|                                       | `  csl:` FILE                         |
| `--citation-abbreviations=`FILE       | `metadata:`                           |
|                                       | `  citation-abbreviations:` FILE      |
| `--natbib`                            | `cite-method: natbib`                 |
| `--biblatex`                          | `cite-method: biblatex`               |
| `--mathml`                            | `html-math-method:`                   |
|                                       | `  method: mathml`                    |
| `--webtex`[`=`URL]                    | `html-math-method:`                   |
|                                       | `  method: webtex`                    |
|                                       | `  `[`url:` URL]                      |
| `--mathjax`[`=`URL]                   | `html-math-method:`                   |
|                                       | `  method: mathjax`                   |
|                                       | `  `[`url:` URL]                      |
| `--katex`[`=`URL]                     | `html-math-method:`                   |
|                                       | `  method: katex`                     |
|                                       | `  `[`url:` URL]                      |
| `--gladtex`[`=`URL]                   | `html-math-method:`                   |
|                                       | `  method: gladtex`                   |
|                                       | `  `[`url:` URL]                      |
| `--trace`                             | `trace: true`                         |
| `--dump-args`                         | `dump-args: true`                     |
| `--ignore-args`                       | `ignore-args: true`                   |
| `--verbose`                           | `verbosity: INFO`                     |
| `--quiet`                             | `verbosity: ERROR`                    |
| `--fail-if-warnings`                  | `fail-if-warnings: true`              |
| `--log=`FILE                          | `log-file:` FILE                      |
| `--bash-completion`                   | (n/a)                                 |
| `--list-input-formats`                | (n/a)                                 |
| `--list-output-formats`               | (n/a)                                 |
| `--list-extensions`[=FORMAT]          | (n/a)                                 |
| `--list-highlight-languages`          | (n/a)                                 |
| `--list-highlight-styles`             | (n/a)                                 |
| `--print-default-template=`FORMAT     | (n/a)                                 |
| `--print-default-data-file=`FILE      | (n/a)                                 |
| `--print-highlight-style=`STYLE\|FILE | (n/a)                                 |
| `--version`                           | (n/a)                                 |
| `--help`                              | (n/a)                                 |
