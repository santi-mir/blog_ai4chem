# Comparing distributed representations

A paper studied this precisely [Is domain knowledge necessary for machine learning materials properties?][comparison].

They state that _featurisation_[^1] is useful for smaller datasets but otherwise fractional or random-vector representation of elements performs just as well.

> [!TIP]
> For data-scarce problems (small datasets) featurisation is useful, for data-rich cases it is irrelevant.

Skip atom includes a comparison of the representations in different tasks, and is discussed below.

## Quality of Atom Representations

One-hot, Random, Atom2Vec, Mat2Vec and SkipAtom compared.

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
[^1]: Careful design (by hand or machine learning) of the vector representations.
