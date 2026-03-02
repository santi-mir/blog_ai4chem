# Atom Vectors - Introduction

These are some of my opinions and ideas after reading the "[Atom2Vec][PNAS]" (2018) and "[SkipAtom][Nature]" (2022) papers.

-----------

## Background: Vectors in NLP

In 2013, Mikolov et. al. proposed an algorithm for learning [continuous vector representations of words][arxiv] using neural networks.

Although the representations had been used for decades, this became an important paper.

The insight was to encode information about the word's environment (neighbouring words). The resulting vectors-space grouped similar words-vectors closeby. The vectors offset arithmetic operations, and became useful for downstream tasks. The classic example is:

vector("Queen") = vector("King") - vector("Man") + vector("Woman")

By exploiting the analogy that _words are to sentences what to atoms are to compounds_, computational chemists have built upon these findings.

## Vectors in Chemistry

Atom vectors can be _built_ from empirical features or they can be _learnt_ by an algorithm[^1]. Learning vectors yields more general-purpose vectors, and has won in popularity.

Both _Atom2Vec_ and _SkipAtom_ are unsupervised algorithms that obtain their atom vectors from databases of compounds. Atom vectors can be combined into compound vectors, and used for downstream tasks like property-prediction.

These approaches compete with others that use crystal-structure information. Without structural informtation they _tend to_ be less accurate, computationally cheaper to learn.

### Embedding

The vector representations can be sparse, like one-hot encoding, or dense, like most approaches. The components of the vectors can be all continuous (real) or all discrete (integers, natural numbers, binary).

Mixing up continuous and discrete components isn't common, nor it is to use complex numbers.

The term _embedding_ is usually used when these properties apply:

- Dense vectors with real (continuous) components,
    - This reduces size of weight matrices in MLPs.
- Compressed versions of higher-dimensional vectors.
- The vector-space is structured (semantically similar vectors are close together.)

These properties allow for more accurate, and smaller networks (faster to train).

[^1]: Empirical features refers to the group and period (and potentially charge, mass, ..). This was widely used prior to 2018, before the automated ones.

[Nature]: https://www.nature.com/articles/s41524-022-00729-3
[PNAS]: https://pnas.org/doi/full/10.1073/pnas.1801181115
[arxiv]: https://arxiv.org/1301.3781v3
