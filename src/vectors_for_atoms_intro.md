# Atom Vectors - Introduction


These are some of my opinions and ideas after reading the "[Atom2Vec][PNAS]" (2018) and "[SkipAtom][Nature]" (2022) papers.

-----------

## Background: Vectors in NLP

Around 2014, Mikolov et. al. proposed an algorithm for machine-learning vector representations of words.

The insight was to encode information about the word's environment (neighbouring words). The vector space had similar word clustered together, and these vectors became useful for downstream tasks.

By exploiting the analogy that _words are to sentences what to atoms are to compounds_, computational chemists have built upon these findings.

## Vectors in Chemistry

Atom vectors can be _built_ from empirical features or they can be _learnt_ by an algorithm[^1]. Learning vectors yields more general-purpose vectors, and has won in popularity.

Both _Atom2Vec_ and _SkipAtom_ are unsupervised algorithms that obtain their atom vectors from compound-databases. Atom vectors can be combined into compound vectors, and used for downstream tasks like property-prediction.

These approaches compete with others that use crystal-structure information, but are computationally cheaper.

## Summary of approaches

Distributed representations are the technical name for the vectors (for atoms, compounds, words,..) we have talked about. They can be continuous or discrete, sparse or dense[^2].

Which ways are there to create vector-representations of atoms?

| Random | One-Hot | Atom2Vec | Mat2Vec | SkipAtom|
|--------|---------|----------|---------|----------|
| From Random Distributions  | One 1, rest 0s | SVD of Atom-Group matrix  | Embedding (Word2Vec)| Embedding (Skip-gram) |
| $(0.4,\ldots,0.6)$ | $(0,\ldots,1,\ldots,0)$| as random | as random | as random |
|dense|sparse|sparse|dense|dense|

Let's see how each algorithm obtains the atom vectors.


[^1]: Empirical features refers to the group and period (and potentially charge, mass, ..). This was widely used prior to 2018, before the automated ones.

[^2]: This are just my definitions and may be wrong!


[Nature]: https://www.nature.com/articles/s41524-022-00729-3
[PNAS]: https://pnas.org/doi/full/10.1073/pnas.1801181115
