# Explainable AI - Methods II

## Other Methods

- Salience Maps: aim to explain which portions of the computation (original model) are most important for different inputs.
- Validity Interval Analysis: another technique fitting the NN behaviour to try to extract explanations.
- Principal Component Analysis, t-SNE, Dimensionality Reduction, Independent Component Analysis, Non-negative Matrix Factorisation can all help as well. But in a way this is better done by architectures with disentangled representations.

## Architectures

Architectures designed to make explaining part of their operation easier.

- Using Explicit Attention: An attention layer/mask learns how parts of an input embedding pay attention to other parts. The layer is somewhat interpretable. In chemistry, it could learn which atoms connect (or pay attention to) other atoms.

- Dissentangled Representations: "Disentangled representations have individual dimensions that describe meaningful and independent factors of variation." from [Explaining Explainability][XX], 2018. Examples of architectures are $\beta$-VAE, INFOGan, capsule networks.

