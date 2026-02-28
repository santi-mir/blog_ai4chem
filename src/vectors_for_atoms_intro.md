# Atom Vectors - Introduction

These are some of my opinions and ideas after reading the "[Atom2Vec][PNAS]" (2018) and "[SkipAtom][Nature]" (2022) papers.

-----------

## Background: Vectors in NLP

Around 2014, Mikolov et. al. proposed an algorithm for machine-learning vector representations of words.

The insight was to encode information about the word's environment (neighbouring words). The resulting word-vectors had similar words nearby in vector space. And these vectors became useful for downstream tasks.

By exploiting the analogy that _words are to sentences what to atoms are to compounds_, computational chemists have built upon these findings.

## Vectors in Chemistry

Atom vectors can be _built_ from empirical features or they can be _learnt_ by an algorithm[^1]. Learning vectors yields more general-purpose vectors, and has won in popularity.

Both _Atom2Vec_ and _SkipAtom_ are unsupervised algorithms that obtain their atom vectors from databases of compounds. Atom vectors can be combined into compound vectors, and used for downstream tasks like property-prediction.

These approaches compete with others that use crystal-structure information. Without structural informtation they _tend to_ be less accurate, computationally cheaper to learn.

The vectors sparse (one-hot) or dense (most approaches). The components can can be continuous (real) or discrete (integers, natural numbers, binary).

Usually, the term _embedding_ is reserved for those dense and continuous, but it varies.

[^1]: Empirical features refers to the group and period (and potentially charge, mass, ..). This was widely used prior to 2018, before the automated ones.

[Nature]: https://www.nature.com/articles/s41524-022-00729-3
[PNAS]: https://pnas.org/doi/full/10.1073/pnas.1801181115
