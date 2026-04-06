# Methods II

## Visual Explainability Methods

- **Saliency Maps**: visually show which features are most important in a particular prediction. They can be generated for 1D, 2D and ND inputs. For example, here is for radiology:
    <div class="center w60">
        <a href="../assets/saliency_map_plus_rnn_text.png">
        <img src="../assets/saliency_map_plus_rnn_text.png" alt="Image with saliency map overlay"/>
        </a>
        <p><strong>Left-most</strong>: input image; <strong>next</strong>: input + saliency map; <strong>right-most</strong>: doctor's annotation (top) and RNN-model generated annotation (bottom). Image taken from <a href="https://arxiv.org/abs/1806.00340">paper</a>.</p>
    </div>

- **Variations**: Individual Conditional Expectation, Partial Dependence Plots, can help visualise decision boundaries; they only vary 1 or 2 variables. Quotes below are snippets from original:
    - > [ICE] operates on instance level, depicting the model's decision boundary as a function of a single feature, with the rest of them staying fixed.
    - > (...) employ [ICE] plots to inspect the model's behaviour for a specific instance, where everything except salary is held constant, fixed to their observed values, while salary is free to attain different values.
    - PDPs are a similar idea, but the remaining features are average values over the dataset points, rather than particular values of an instance.

- **Validity Interval Analysis**: another technique fitting the NN behaviour to try to extract explanations.

## Feature Relevance

- SHAP (possibly also LIME),
- Influence Functions.

## Simplification

- LIME (possibly also SHAP). Explained in previous post,
- **Anchors**: the authors of LIME also proposed this method, which is similar to what-ifs/counterfactuals, described by [Principles and practice of explainability in ML][principles_and_practice]:
    - > A similar technique, called anchors, can be found in (Ribeiro et al., 2018). Here the objective is again to approximate a model locally, but this time not by using a linear model. Instead, easy to understand "if-then" rules that anchor the model's decision are employed. The rules aim at capturing the essential features, omitting the rest, so it results in more sparse explanations.
    - > (...) decides to use anchors in order to achieve just that, generate easy-to-understand "if-then" rules that approximate the opaque model's behaviour in a local area (Figure 9). The resulting rules would now look something like "if salary is greater than 20 k£ and there are no missed payment, then the loan is approved.

## Other methods

- **Dimensionality Reduction**: Principal Component Analysis, t-SNE, Dimensionality Reduction, Independent Component Analysis, Non-negative Matrix Factorisation.
- **Counterfactuals**: _What ifs_; What if I change this feature value, for this instance? How does the output change?G
    - Change the instance slightly, but such that the model classifies the new instance in a different category.
    - > (...) the applicant had missed one payment that led to this outcome, and that had he/she missed none the application would had been accepted

## Explanation-producing Architectures

Architectures designed to make explaining part of their operation easier.

- Using Explicit Attention: An attention layer/mask learns how parts of an input embedding pay attention to other parts. The layer is somewhat interpretable. In chemistry, it could learn which atoms connect (or pay attention to) other atoms.

- Dissentangled Representations: <q>Disentangled representations have individual dimensions that describe meaningful and independent factors of variation.</q> &mdash;[Explaining Explainability][XX] (2018). Examples of architectures are $\beta$-VAE, INFOGan, capsule networks.

<details>
<summary>Sources</summary>
To Do !
</details>

<!-- [whatifs_wachter]: https://arxiv.org/pdf/1711.00399 -->
[XX]: http://arxiv.org/abs/1806.00069
[principles_and_practice]: https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2021.688969/full
