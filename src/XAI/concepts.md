# Explainable AI - I

Explanations are usually defined as answers to a _why-question_, with certain properties and structure; there are also those who challenge the _question-type_, and are more flexible in terms of what counts as an answer.

In XAI we are usually concerned about _model explainability_. It can be defined as the degree to which we can answer _how_ the model functions, _why_ it operates in one way or another, and so forth.

## Characteristics of explanations

We characterise explanations as a _cognitive process_ (finding an answer), a product (the answer) and a _social process_ (communicating it).
This can be associated with a series of steps:

0. There is _something_ to explain (_explanandum_),
1. The explainer _filters_ aspects of the _explanandum_ deemed relevant (using prior knowledge),
2. _Generates_ possible answers (through explanation techniques),
3. _Weight_ the likelihood of each hypotheses,
4. Possibly selecting the most likely until contradicted by experience or super-seeded (e.g. by a simpler explanation),
5. Communicate it.

Mapping this to the framework proposed in the paper [Explanation in artificial intelligence: insights from the social sciences][explanations_social], we have `1.`, `2.`, `3.` as part of the _cognitive process_, `4.` is the _product_ or result of it, and `5.` is a _social process.

If the answer is already known, only `5.` is needed.

The paper above notes that _why-questions_ are usually contrastive questions, phrased as _why P rather than Q_ instead of _why P_. In this latter case, the _foil_ (Q) is implicit.

## Social Process
The answer must then be communicated, and there are expectations about it.

[Gricean Maxims][gricean_maxims] are rules observed in _good_ communication. These rules can also be used as a guide for good _model explanations_.

1. **Informative** (Quantity): right amount of context and details,
2. **Truthful** (Quality, or Fidelity): Try to make it true,
3. **Relevance** (Relation): do not state things that aren't needed (provide insight),
4. **Manner** (clarity): express it in elegant terms.

## Explanatory success

There are aspects that tend to make explanations more successful:

- **Simplicity**: if it involves a shorter chain of causes, it is preferred,
- **Generality**: if it explains other cases, it is preferred,
- **Prior knowledge/beliefs**
    - Conditions generation and veto of hypotheses. For example, "The drawer slides because it wants." may be ignored in different basis. Another illustrative example from [The structure and function of explanations][lombrozo]:
    > (...) If told that herring and tuna have a disease, naive participants are more likely to extend the property to wolffish, the more similar item, than to dolphins. However, among fishing experts, who can generate an explanation for why the property might hold (e.g. tuna contract the disease by eating infected herring), similarity is less predictive of property extensions. (...)

    - Aids selecting what seems causally / explanatory relevant from what is not. Consider two light beams interfering on a Sunday. The day is irrelevant (usually), we disregard a confounding factor.

I don't have much to say about _product_ (`2.`), so we jump to `3`.

## Metaphors

<details><summary>The Machine and The Agent (click to open)</summary>

In the scientific and science-adjacent domains, models are conceptualised as _machines_:

1. They have parts, each with a function, a role,
2. They correspond with some aspect of the reality being modelled.

Outside of science or the technical domain, they're conceptualised as _human-like agents_:

1. They tend to be explained in human terms,
2. They are expected to be reliable, consistent, ...

So explanations are answers to _why-questions_; _good_ explanations respect the Gricean maxims, and will be dependent on the audience (their preferred style, expectations, expertise).

The table below is a summary of the ideas above

| Perspective      | Model is a… | Preferred Explanation style           | Audience            |
| ---------------- | ----------- | --------------------------- | ------------------- |
| **Scientific**   | Machine     | Mechanistic, causal, formal | Experts             |
| **Human-facing** | Agent       | Intentional, narrative      | Users, stakeholders |

Many other metaphors could be proposed.

</details>

In the next post we use our knowledge to define Explainable AI.

------------

<details>
<summary>List of sources used in this blogpost</summary>

1. [Studies in the logic of explanation][logic_of_expl_hempel] (1948),
1. [Explanations, Predictions and Laws][scriven] (1948),
1. [On the mechanization of abductive logic][abductive_logic] (1973). The first page is quite interesting.
<!-- A **deduction** (proof) is e.g. "All cats are animals (I); animals are big (II); then cats are big (III)", whereas **abduction** (hypothesis) would be "III; I; maybe II" notice the _maybe_ (anti-clockwise rotation). Another anti-clockwise rotation takes us to **induction** (generalisation,hypothesis): "II; III; maybe all I". -->
1. [A Unified Approach to Interpreting Model Predictions][shap_values] (2017): paper proposing SHAP, that is, showing Shapley values as the best coefficients in linear combination of features, given 3 requirements (local accuracy, missingness and consistency),
1. [Explaining Explanations: An Overview of Interpretability of Machine Learning][xx] (2018),
1. [Producing radiologist-quality reports for interpretable artificial intelligence][xai_rnn_radiology] (2018): a "case study",
1. The paper ["Explanation in artificial intelligence: insights from the social sciences"][explanations_social] (2019, 38 pages). Once the why-cause is found (diagnosis), it may be communicated, making rules of conversation relevant: [Gricean Maxims of Communication][gricean_maxims] (blog-post), or [Wikipedia's][wikipedia_gricean].
   - The definition of explanation extends previous work by Lombrozo on [The structure and function of explanations][lombrozo] (2006).
1. [The perils and pitfalls of explainable AI: Strategies for explaining algorithmic decision-making][perils_and_pitfalls] (2021): emphasis on socio-political aspects,
1. [Interpretable and Explainable Machine Learning for Materials Science and Chemistry][xai4mat] (2022),
1. Blog Posts: [What is Explainable AI?][what_is_xai] (2022) and from [IBM][xai_ibm],
1. [A Perspective on Explainable Artificial Intelligence Methods: SHAP and LIME][using_shap_lime] (2024).

</details>

<!-- Also, a very interesting experiment in terms of explainability was <https://distill.pub>. -->

[abductive_logic]:https://www.ijcai.org/Proceedings/73/Papers/017.pdf
[explanations_social]: https://www.sciencedirect.com/science/article/pii/S0004370218305988
[gricean_maxims]: https://effectiviology.com/principles-of-effective-communication/
[logic_of_expl_hempel]: https://fitelson.org/woodward/hempel_oppenheim.pdf
[lombrozo]: https://fitelson.org/few/few_08/lombrozo_reading.pdf
[perils_and_pitfalls]: https://www.sciencedirect.com/science/article/pii/S0740624X21001027
[shap_values]: https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html
[scriven]: https://fitelson.org/woodward/scriven_epl.pdf
[using_shap_lime]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
<!-- [XAI for whom]: http://arxiv.org/abs/2106.05568 -->
[wikipedia_gricean]: https://en.wikipedia.org/wiki/Cooperative_principle
[what_is_xai]: https://www.sei.cmu.edu/blog/what-is-explainable-ai/
[xai4mat]: https://pubs.acs.org/doi/10.1021/accountsmr.1c00244
[xai_ibm]: https://www.sei.cmu.edu/blog/what-is-explainable-ai/
[xai_rnn_radiology]: https://arxiv.org/abs/1806.00340
[xx]: http://arxiv.org/abs/1806.00069


