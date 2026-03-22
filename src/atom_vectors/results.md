# Comparison

SkipVec and Atom2Vec were previously discussed.

The paper [Is domain knowledge necessary for machine learning materials properties?][comparison] compared descriptors (same as vector representations) generated in different ways for downstream tasks.

They find hand-crafted descriptors useful for small and large datasets, but these are cumbersome to create &mdash;expert knowledge is required. One-hot and random-vectors perform similar to hand-crafted descriptors in large datasets.

With that, it seems wise to use hand-crafted descriptors for small datasets, and learnt, one-hot or random for larger ones.

SkipAtom evaluates on different approaches and tasks, and finds their method outperforms one-hot and random-vector, but does not test hand-crafted ones.

[SkipAtom]'s comparison of representations is discussed below.

## Simple classification

We have a simple classification of the available methods:

1. Human-engineered vectors;
2. Low effort vectors: one-hot encoded (ElemNet), random, Atom2Vec;
3. Machine-learnt vectors (SkipAtom).

Atom2Vec may be in category 3 above; however, it is not an optimisation that creates them, it is a matrix factorisation.

## Quality of Atom Representations

[ElemNet] (One-hot), Random, [Atom2Vec], Mat2Vec and [SkipAtom] compared.

The atom-vectors were _concatenated_ into compound representations, and these used to predict elpasolites (compounds) formation-energy.

SkipAtom outperformed other methods.

## Pooling approaches

Vector pooling strategies were compared through 9 prediction tasks; 5 regressions, 3 classifications and OQMD Formation Energy prediction (also a regression).

- OQDM: bag-of-atoms, which is sum-pooling hot-enc atom vectors, is best.

The rest is summarised well in the paper:

> (...) the models described in this report outperform the existing benchmarks on tasks where only composition is available (namely, the Experimental Band Gap, Bulk Metallic Glass Formation, and Experimental Metallicity tasks). Also, on the Theoretical Metallicity task and the Refractive Index task, the pooled SkipAtom, Mat2Vec and one-hot vector representations perform comparably [to the SOTA], despite making use of composition information only.

And an interesting observation:

> The ElemNet architecture demonstrated (...) Perhaps surprisingly, the combination of a deep feed-forward neural network with compound representations consisting of composition information alone results in competitive performance when comparing to approaches that make use of structural information.

## Use cases and limitations

Training does not rely on labelled data (unsupervised learning).

The model just needs the formula at inference time, and does fine with non-stoichiometric solids. So having the material's composition &mdash;but no structural information&mdash; we can still calculate some properties.

Similar compounds have similar vectors, which is useful. But without structural information, all isomers have the same vector, which is a limitation.

It is computationally cheap, and can help screen large number of compounds as a first selection step.

[comparison]: https://link.springer.com/article/10.1007/s40192-020-00179-z
[Atom2Vec]: https://arxiv.org/pdf/1807.05617
[SkipAtom]: https://www.nature.com/articles/s41524-022-00729-3.pdf
[ElemNet]: https://www.nature.com/articles/s41598-018-35934-y
