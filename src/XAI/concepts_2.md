# Explainable AI

Having defined _causal explanations_ we can define _model explainability_ &mdash;the focus of Explainable Artificial Intelligence&mdash; as:

> finding the causes underlying a model's predictions or operation.

But _can a model be pragmatically considered explainable if it can not be communicated to the target audience?_

It should also be noted that, while explanations are often framed causally, they may involve non-causal relations such as correlations, constraints, or contributions (LIME, SHAP). Especially in XAI.

We can amend the definition of _model explainability_ to better fit the 3-legged definition of explanations given earlier:

> the degree to which humans can effectively answer questions about a model's predictions or operation, either directly or using explainability methods.

_Questions_ includes more than just why-questions, and also accepts associations and contributions; we won't necessarily get to a causal structure.

_Effectively_ includes the social and communicational aspect of it (which Grice's Maxims aid).

## Trade-off

One trade-off is that each audience will demand certain guarantees, and have expectations, and expertise, but we do not want lose much fidelity to the original model.

Simplification loses fidelity. Care must be taken to make "things as simple as possible, but not simpler" or there is risk of **oversimplifying**. This is compounded by the fact that more complex and accurate models tend to be less explainable.

This is not universal, but we could represent this common case as:

<div class="center w30">
    <a href="../assets/tradeoff.webp">
    <img src="../assets/tradeoff.webp" alt="Model Explainability vs Model accuracy tradeoff."/>
    </a>
    <p>Model accuracy vs Model explainability tradeoff.</p>
</div>

## Overview of methods

Within the _cognitive process_ of explanations, _model explainability_ benefits from methods to identify causes or relevant properties.

For all audiences, we can group these methods into more general categories, and then go into specific cases for a certain audience.

### Kinds of Methods

The survey [Principles and practise of explaining ML models][principles_and_practice] includes a table of **method kinds**. A modified version of the table is below:

| Kind         | Advantages    | Disadvantages | Question |
|---------------------|---------------|---------------|----------|
| **Local explanations** | Explains the model's behaviour in a local area of interest. Operates on instance-level explanations. | Explanations do not generalize on a global scale. Small **perturbations** might result in very different explanations.| How do small perturbations affect the output / prediction? |
| **Examples**      | Representative items for each class provide insights about the model's internal reasoning. | Examples require human selection. They do not explicitly state what parts of the example influence the model. | How do inputs from different classes compare? And same? |
| **Feature relevance** | They operate on an instance level (some can operate globally). | Methods may make assumptions which do not hold (e.g. feature independence, linearity).| Which input features are most important? |
| **Simplification**  | Simple surrogate models explain opaque ones. | Surrogate models may not approximate original models well. | Can we get local insights by using a simpler model? |
| **Visualizations**  | Easier to communicate to non-technical audiences. Most approaches are intuitive and not hard to implement. | There is an upper bound on how many features can be considered at once. Humans must inspect plots to derive explanations. | Class boundaries? |

We should remember that:

> Relying on only one technique will only give us a partial picture of the whole story, possibly missing out important information. Hence, combining multiple approaches together provides for a more cautious way to explain a model. (...) At this point we would like to note that there is no established way of combining techniques (in a pipeline fashion),

In the next posts, we focus on **methods** that aid _causal attribution_ (or cognitive process) with a scientific audience in mind.

### Map of XAI

An interesting map of XAI is given in the survey [Principles and practice of explainable ML][principles_and_practice] (2021).

Most _classic ML_ models are in the <span style="padding:0.15rem; display: inline-block; border-radius:0.5rem; border:0.15rem dashed purple">dashed</span> area under **Model types** column.

_Classic ML_ models are usually _transparent_ (intrinsically explainable) but _may_ benefit from post-hoc (post training) explanations, such as visualising it. When transparency is key and the predictions are accurate enough, these may be preferred over DL models.

<div class="center w50">
    <a href="../assets/taxonomy.webp">
    <img src="../assets/taxonomy.webp" alt="Complex Graph linking prediction models such as SVMs, kinds of explanations such as text or graph, and explanation methods such as SHAP."/>
    </a>
    <p>
    Image from <a href="https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2021.688969/full">paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY</a>
    </p>
</div>

The focus here though, is explaining _deep learning_ models. These are usually _opaque_ ("_black-box_") models, and their accuracy is usually higher than classic ML models.

In other words, classical ML and DL models each have their use-cases.

-------------------

<details>
<summary>List of sources used in this blogpost</summary>

1. [Principles and practice of explainable machine-learning][principles_and_practice] (2021, 25 pages): Sections 8&ndash;11 are a useful review of explainability methods.

</details>

<!-- Also, a very interesting experiment in terms of explainability was <https://distill.pub>. -->

[principles_and_practice]: https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2021.688969/full
