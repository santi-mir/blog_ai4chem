# Explainable AI - Methods II

## Visual Explainability Methods

- **Saliency Maps**: visually show which features are most important in a particular prediction. They can be generated for 1D, 2D and ND inputs. For example, here is for radiology:
    <div class="center w60">
        <a href="../assets/saliency_map_plus_rnn_text.png">
        <img src="../assets/saliency_map_plus_rnn_text.png" alt="Image with saliency map overlay"/>
        </a>
        <p><strong>Left-most</strong>: input image; <strong>next</strong>: input + saliency map; <strong>right-most</strong>: doctor's annotation (top) and RNN-model generated annotation (bottom). Image taken from <a href="https://arxiv.org/abs/1806.00340">paper</a>.</p>
    </div>

- **Variations**: Individual Conditional Expectation, Partial Dependency Plots, can all help as well.
    - ICE: <q>(...) operates on instance level, depicting the model’s decision boundary as a function of a single feature, with the rest of them staying fixed</q>. PDPs are a similar idea, but the remaining features are average values over the dataset points, rather than particular values of an instance.

- **Validity Interval Analysis**: another technique fitting the NN behaviour to try to extract explanations.

## Feature Relevance
- SHAP (possibly also LIME),
- Influence Functions.

## Simplification
- LIME (possibly also SHAP). Explained in previous post,
- **Anchors**: the authors of LIME also proposed this method, described by [Principles and practice of explainability in ML][principles_and_practice]:
    > A similar technique, called anchors, can be found in (Ribeiro et al., 2018). Here the objective is again to approximate a model locally, but this time not by using a linear model. Instead, easy to understand "if-then" rules that anchor the model's decision are employed. The rules aim at capturing the essential features, omitting the rest, so it results in more sparse explanations.

## Other methods

- **Dimensionality Reduction**: Principal Component Analysis, t-SNE, Dimensionality Reduction, Independent Component Analysis, Non-negative Matrix Factorisation.
- **Counterfactuals**: The same paper as above describes:
    > There has been considerable recent development in the socalled counterfactual explanations (Wachter et al., 2018). Here, the objective is to create instances as close as possible to the instance we wish to explain, but such that the model classifies the new instance in a different category.

## Explanation-producing Architectures

Architectures designed to make explaining part of their operation easier.

- Using Explicit Attention: An attention layer/mask learns how parts of an input embedding pay attention to other parts. The layer is somewhat interpretable. In chemistry, it could learn which atoms connect (or pay attention to) other atoms.

- Dissentangled Representations: <q>Disentangled representations have individual dimensions that describe meaningful and independent factors of variation.</q> &mdash;[Explaining Explainability][XX] (2018). Examples of architectures are $\beta$-VAE, INFOGan, capsule networks.

[XX]: http://arxiv.org/abs/1806.00069
[principles_and_practice]: https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2021.688969/full
