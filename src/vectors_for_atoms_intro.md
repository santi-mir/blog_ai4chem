# Atom Vectors - Introduction

Machine-learnt vectors for atoms were inspired by NLP models. An example was learning [continuous vector representations of words][arxiv] using neural networks by Mikolov et. al. in (2013).

The insight of the paper was to encode information about a word's environment (neighbouring words). The resulting vectors had similar word-vectors clustered together in vector space.

The vectors supported semantically  meaningful arithmetic operations, and became useful for downstream tasks. A classic example was:

vector("Queen") = vector("King") - vector("Man") + vector("Woman")

By exploiting the analogy that _words are to sentences what atoms are to compounds_, computational chemists have built upon these findings.

## Vectors in Chemistry

Atom vectors can be expert-designed or they can be _learnt_ by an algorithm[^1]. Learning vectors yields more general-purpose vectors, and has won in popularity.

Both [Atom2Vec] and [SkipAtom] are unsupervised algorithms that obtain their atom vectors from databases of compounds. Atom vectors can be combined into compound vectors, and used for downstream tasks like property-prediction.

These approaches compete with others that use crystal-structure information. Without structural informtation they _tend to_ be less accurate, computationally cheaper to learn.

### Embedding

A simple definition is:

>[!NOTE]
> _Embeddings_ are machine-learnt vectors $\in \mathbb{R}^N$.

Though that alone isn't quite complete. Normally, they are also:

- Dense rather than sparse i.e they have few zeros,
- Real-valued rather than discrete,
- Non-human-readable (though some parts may be interpretable).
- Belong to a structured vector space: semantically similar vectors are close together and allow for meaningful vector-arithmetic.

Dense vectors are useful because training will be faster (than a similar sparse version).

### Featurisers

The strategy to generate the descriptors (atom or element-vectors) is called a _featuriser_.

Element descriptors can be:

- Simple: like hot-encoded, random;
- Human-designed: Composition-Based Feature Vector (CBFV) which are expert-curated vectors as in Jarvis, Magpie;
- Machine-learnt: embeddings, like SkipAtom.

which are combined in some way to describe compounds.

We can pick any of the already-computed element-descriptors and use them as inputs, or run the featurising process to make our own.

A performance-comparison of vector representations is carried out in ["Is domain knowledge necessary for machine learning materials properties?"][comparison].

Their conclusion is: Human-designed Composition Based Feature Vectors (CBFV like Jarvis and Olyinyk) outperform other methods if there isn't much data. This was prior to SkipAtom, but does include Atom2Vec.

Otherwise, performance in downstream tasks is similar to hot-encoded or random vectors.

> (...) Although new, data-driven approaches are of interest, those studied here have yet to surpass CBFVs in terms of material property prediction with small data.

[SkipAtom]: https://www.nature.com/articles/s41524-022-00729-3
[Atom2Vec]: https://pnas.org/doi/full/10.1073/pnas.1801181115
[arxiv]: https://arxiv.org/1301.3781v3
[comparison]: https://www.researchgate.net/profile/Taylor-Sparks-2/publication/343926838_Is_Domain_Knowledge_Necessary_for_Machine_Learning_Materials_Properties

[^1]: Empirical features refers to the group and period (and potentially charge, mass, ..). This was widely used prior to 2018, before the automated ones.
