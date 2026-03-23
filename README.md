# Blog

Where I write my thoughts on topics related to AI for chemistry.

The posts are normally very short, some of them in a few parts.

**URL**: <https://santi-mir.github.io/blog_ai4chem>.

## Build

The repo contains the built html-book in `./docs`, it makes publishing faster than using actions.

The packages needed for building from the source markdown files are:

```bash
cargo install mdbook mdbook-mermaid mdbook-katex
```

## Development

Besides the build-apps, install:

```text
cargo install lychee rumdl caesiumclt
```

It's useful to have a pre-commit git hook

```bash
#!/bin/env bash
rumdl check
mdbook build
```

And pre-push

```bash
#!/bin/env bash
lychee src || exit 1
caesiumclt --lossless -O bigger src/assets/*.{jpg,jpeg,png} --same-folder-as-input
```

Then do `chmod +x .git/hooks/{pre-push,pre-commit}`

## License

All the content here is under [CC BY 4.0], except for quotations which may share the license of the source.

## Contributions

Contributions are taken under the same license, [CC BY 4.0].

## Tools Used

- [mdbook]: a Rust crate to render html from markdown.
- [mermaid]: NPM package to draw basic charts.

[mdbook]: https://github.com/rust-lang/mdBook
[mermaid]: https://github.com/orgs/mermaid-js
[CC BY 4.0]: https://creativecommons.org/licenses/by/4.0/
