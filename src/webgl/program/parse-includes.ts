import { Shaders } from '../types'

/**
* This is a preprocessor for shaders.
* Directives  `#include`  will be  replaced  by  the content  of  the
* correspondent attribute in `includes`.
*/
export function parseIncludes(
   codes: Shaders,
   includes: { [key: string]: string }
): Shaders {
   return {
       vert: parseIncludesForCode(codes.vert, includes),
       frag: parseIncludesForCode(codes.frag, includes),
   }
}

function parseIncludesForCode(
   code: string,
   includes: { [key: string]: string }
): string {
   return code
       .split("\n")
       .map(function (line) {
           if (line.trim().substr(0, 8) != "#include") return line
           const pos = line.indexOf("#include") + 8
           let includeName = line.substring(pos).trim()
           // We accept all this systaxes:
           // #include foo
           // #include 'foo'
           // #include <foo>
           // #include "foo"
           if ("'<\"".indexOf(includeName.charAt(0)) > -1) {
               includeName = includeName.substring(1, includeName.length - 1)
           }
           const snippet = includes[includeName]
           if (typeof snippet !== "string") {
               console.error(
                   "Include <" + includeName + "> not found in ",
                   includes
               )
               throw Error("Include not found in shader: " + includeName)
           }
           return snippet
       })
       .join("\n")
}

