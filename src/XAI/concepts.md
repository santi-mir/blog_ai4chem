# Explainable AI - Concepts

There are many definitions of what explanations are in the context of explainable AI (XAI), such as:

> Explainable AI aims to _describe a model's predictions or operation_.
>
> _How_ does it operate? _Why_ does it makes certain prediction? _What_ is the role of certain neuron or layer?

In this post, _model_ refers to the deep learning model; and _method_ refers to the explanation aspects.

## Dimensions of interest

Here the focus is on _some_ aspects of explanations (not of the model):

- __Simplicity__: how easy to understand the explanation is.
    - How much expertise does a human needed to understand it?
    - This is also correlated with how simple _the model itself_ is.
- __Accuracy__: How accurately it describes the model's behaviour? Can we predict using the explanation?
    - Does it lead to surprises or obvious contradictions?
- __Kind__: Textual, Visual, Local (some restricted domain) v Global, by example, by simplification (fitting a simpler model), feature contributions (measuring each input-feature contribution), Intrinsic vs Extrinsic, and so forth!

<div class="w40 center">
<a href="../assets/tradeoff.png">
<img alt="graph looking like completeness is the inverse of simplitity." src="../assets/tradeoff.png"/>
</a>
<p>Explanation Accuracy v. Explanation Simplicity tradeoff.</p>
</div>

This trade-off isn't universal but just a common case, particularly in deep learning; some other models are straightforward, in which case both characteristics can be high.

### Predictive power

__Predictive power__ is a characteristic of a _model_, not of an _explanation_ of a model. Yet, it is correlated to the characteristics given earlier: more predictive models tend to be more complex making harder to explain them.

The reason to include it here is that _predictive power_ plays an important role deciding which model to use.

In the image below, note that _understandability_ replaces _simplicity_, and _correctness_ replaces _predictive power_.

<div class="center w40"> <!--other classes: w220, w420-->
    <a href="../assets/radar_plot.png">
    <img src="../assets/radar_plot.png" alt="Plot of the three dimensions"/>
    </a>
    <p>
    Image from <a href="https://pubs.acs.org/doi/10.1021/accountsmr.1c00244">paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

Let's now look at some actual methods.

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
