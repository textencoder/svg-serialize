svg-serialize is a Node.js script that leverages the svgson library for rapid JSON serialization of .svg files in a single directory.

This script assumes that each `<svg>` has at least one child element and each child element of the `<svg>` is a `<path>` with an accompanying id attribute.
