import 'piccolore';
import './shared_DyYQXJN5.mjs';
import 'es-module-lexer';
import './astro/server_CrEBP8um.mjs';
import 'clsx';
import 'html-escaper';

function shouldAppendForwardSlash(trailingSlash, buildFormat) {
  switch (trailingSlash) {
    case "always":
      return true;
    case "never":
      return false;
    case "ignore": {
      switch (buildFormat) {
        case "directory":
          return true;
        case "preserve":
        case "file":
          return false;
      }
    }
  }
}

const apiContextRoutesSymbol = Symbol.for("context.routes");

export { apiContextRoutesSymbol as a, shouldAppendForwardSlash as s };
