# Atom Vectors - Introduction

_Atom vectors_ is a broad category. Narrower categories are:

- _Descriptor_: used for expert-designed vectors,
- _Embedding_: used for machine-learnt vectors.

These vector representations are of interest because they can be useful inputs for training machine-learning models.[^1]

Here we are interested in methods that don't require human expertise, hence _descriptors_ won't be discussed.

## Embeddings

Embeddings are _machine-learnt vectors $\in \mathbb{R}^N$._ Normally, they are also:

- Dense rather than sparse i.e they have few zeros,
- Real-valued rather than discrete,
- Non-human-readable (though some parts may be interpretable),
- Belong to a structured vector space: semantically similar vectors are close together and allow for meaningful vector-arithmetic.

Dense vectors are useful because training will be faster (than a similar sparse version).

### Some Background on Embeddings

Embeddings for atoms were inspired by NLP models from the 2010s.

One such example was learning [continuous vector representations of words][word embeddings] (2013). They proposed an automated mechanism generate word-vectors by absorbing information from that word's environment (neighbouring words).

Materials science has exploited the same ideas, for example:

- <q>properties of an atom can be inferred from the environments it lives in</q> ([Atom2Vec], 2018),
- <q>atoms are to compounds as words are to sentences</q> ([SkipAtom], 2022),

The surprise was that similar words (or atoms) produce similar vectors. The vectors also support semantically meaningful arithmetic operations, and became useful for downstream tasks. A classic example was:

```txt
vector("Queen") = vector("King") - vector("Man") + vector("Woman")
```

## Vectors in Chemistry

As dicussed earlier, atom vectors can be expert-designed or they can be _learnt_ by an algorithm. Learning vectors yields more general-purpose vectors, and has won in popularity.

Both [Atom2Vec] (2018) and [SkipAtom] (2022) are unsupervised algorithms that obtain their atom vectors from databases of compounds. Atom vectors can be combined into compound vectors, and used for downstream tasks like property-prediction.

### Classifications and Featurisers

The method used to generate our vectors is called a _featuriser_ (we can use a featuriser or create our own). There are many common approaches:

- Simple: like hot-encoded, random;
- Human-designed: Composition-Based Feature Vector (CBFV) which are expert-curated vectors as in Jarvis, Magpie;
- Machine-learnt: embeddings, like SkipAtom.

Atom-vectors can be combined to describe compounds. Examples of combination methods are concatenation into a long vector and pooling of vectors (e.g. summing them up).

#### Comparing representations

A performance-comparison of vector representations is carried out in ["Is domain knowledge necessary for machine learning materials properties?"][comparison] (2020).

Their conclusion is: human-designed Composition Based Feature Vectors (CBFV like Jarvis and Olyinyk) outperform other methods if there isn't much data. This was prior to SkipAtom, but does include Atom2Vec.

Otherwise, performance in downstream tasks is similar to hot-encoded or random vectors.

> (...) Although new, data-driven approaches are of interest, those studied here have yet to surpass CBFVs in terms of material property prediction with small data.

However, ["Domain Independent XAI for Material Science"][ehme] (2025) challenges that conclusion:

> Our method challenges this perception: we obtain excellent classifiers that are interpretable and based on a small amount of training data without using any domain knowledge: (...)

They assert that one-hot encoded vectors can still achieve good results using small datasets, as long as the network is designed in the way they specify.

### Thoughts

Human-designed vectors are easier to interpret. Machine learnt vectors require more effort.
Can we design machine-learnt interpretable vectors that are intrinsically interpretable?

Attention-masks and disentangled representations are closer to this.

[SkipAtom]: https://www.nature.com/articles/s41524-022-00729-3
[Atom2Vec]: https://pnas.org/doi/full/10.1073/pnas.1801181115
[word embeddings]: https://arxiv.org/abs/1301.3781v3
[comparison]: https://www.researchgate.net/profile/Taylor-Sparks-2/publication/343926838_Is_Domain_Knowledge_Necessary_for_Machine_Learning_Materials_Properties
[ehme]: https://www.fruct.org/files/publications/volume-38/fruct38/Urs.pdf

[^1]: Machine Learning (ML) includes deep-learning and traditional methods like regression, support vector machines, random forests and so on.
