# Contributing

Please note that any contribution is under MIT license unless stated otherwise.

1. Fork the repository,
2. Create a new branch "fix-x"
3. Send PR.

## Best practices

These are a guideline, not mandatory.

### No AI, no emojis

Please avoid:

- AI-written content.
- Emojis.

### Numbering

- Book chapters are numbered folders (e.g. `ch_1`).
- Files are not numbered, but have a descriptory name such as `i2c.md`.
- Each exercises is a crate e.g `hello_world`, `panic` etc. They are not numbered.

This rule makes reasonably easy to adapt or change things as the book evolves.

### Links

- Instead of `[Some Text](https://some.link)` use `[Some Text]`. And at the bottom of the page add `[Some Text]: https://some.link`.
    - This makes it easier to read the text.

If you find trouble with some case, just use the `[..](..)` syntax, it's no big deal!

### Model

- `esp32-c6`, no uppercases.

### Images

Including images, you may want to use the snippet:

```html
<div class="center w320"> <!--other classes: w220, w420-->
<!--Start with `/` following path from `src`.-->
    <a href="/assets/<image_name>.jpg">
        <img alt="Add Alt Description" src="/assets/<image_name>.jpg"/>
    </a>
    <p>Optional footer</p>
</div>
```
