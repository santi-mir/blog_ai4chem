# Explainable AI - Concepts

There are many definitions of what XAI is. I like to define it as:

> XAI aims to make a model's predictions and operation understandable to humans by providing insights into _why_ a prediction was made and _how_ the model uses input features.

Note: in this post _model_ refers to the deep learning model, and _method_ refers to the explanation aspects.

Explainability can be viewed as a trade-off between how empowering an explanation is and how complex it is. This is explored next.

## Dimensions of interest

Here the focus is on _some_ aspects of explanations (not of the model).

__Complexity__: how hard it is to understand, operationally measured relative to a reference human or target audience.

__Insight__: how much the explanation empowers users to understand the model, either intuitively or quantitatively.
- Can we directionally predict using the explanation?
- Does it fail in some specific cases? Does it lead to surprises or obvious contradictions?
- Helps form an intuition of the model's workings?

**Other variables**: local vs global; intrinsic vs extrinsic. This forms four categories: intrinsic-global, intrinsic-local, extrinsic-global, and extrinsic-local explanations.

Given a category from the 4 above, we can think of explainability as $X_p = \frac{I}{C}$, that is, equals explanation-insight divided by explanation-complexity.

Opaque or black-box models are usually complex and have low intrinsic explainability (local or global), but they may have allow reasonably good extrinsic explanations (local and/or global).

__Predictive power__ is a property of the model, not of the explanation.

Highly predictive models (often more complex) are also harder to interpret, especially intrinsically (globally or locally).

Explainability methods often aim to approximate or simplify these models and explain them extrinsically (globally or locally).

## Taxonomy

Let's now look at how XAI methods are categorized in practice.
An interesting map using **Category, Principle, and Technique** is given in [Principles and practices][principles_and_practices] (2021); a modified (crop) of the image is reproduced below:

<div class="center w25"> <!--other classes: w220, w420-->
    <a href="../assets/model_agnostic_explanations.png">
    <img src="../assets/model_agnostic_explanations.png" alt="Plot of the three dimensions"/>
    </a>
    <p>
    Image from <a href="https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2021.688969/full">paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY</a>
    </p>
</div>

The image also shows a useful classification of explanations by type or kind. Some of these are: textual, visual, Local / Global, Intrinsic / Extrinsic, by examples, using simplification (e.g. fitting a simpler model), feature contributions.

Let's now look at some methods.

--------------------

<details>

<summary>Sources</summary>

1. [A Unified Approach to Interpreting Model Predictions][shap_values] (2017): paper proposing SHAP, that is, showing Shapley values as the best coefficients in linear combination of features, given 3 requirements (local accuracy, missingness and consistency),
1. [Explaining Explanations: An Overview of Interpretability of Machine Learning][xx] (2018),
1. [Producing radiologist-quality reports for interpretable artificial intelligence][xai_rnn_radiology] (2018): a "case study",
1. [Principles and practice of explainable machine-learning][principles_and_practices] (2021, 25 pages): an interesting overview of many aspects of XAI,
1. [The perils and pitfalls of explainable AI: Strategies for explaining algorithmic decision-making][perils_and_pitfalls] (2021): emphasis on socio-political aspects,
1. [Interpretable and Explainable Machine Learning for Materials Science and Chemistry][xai4mat] (2022),
1. Blog Posts: [What is Explainable AI?][what_is_xai] (2022) and from [IBM][xai_ibm],
1. [A Perspective on Explainable Artificial Intelligence Methods: SHAP and LIME][using_shap_lime] (2024).

</details>

<!-- Also, a very interesting experiment in terms of explainability was <https://distill.pub>. -->

[xai4mat]: https://pubs.acs.org/doi/10.1021/accountsmr.1c00244
[using_shap_lime]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
[xx]: http://arxiv.org/abs/1806.00069
[shap_values]: https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html
<!-- [XAI for whom]: http://arxiv.org/abs/2106.05568 -->
[what_is_xai]: https://www.sei.cmu.edu/blog/what-is-explainable-ai/
[xai_ibm]: https://www.sei.cmu.edu/blog/what-is-explainable-ai/
[xai_rnn_radiology]: https://arxiv.org/abs/1806.00340
[perils_and_pitfalls]: https://www.sciencedirect.com/science/article/pii/S0740624X21001027
[principles_and_practices]: https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2021.688969/full
