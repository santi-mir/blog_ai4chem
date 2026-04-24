<!-- # Complex Systems View -->
<!---->
<!-- Think of complex objects such as: -->
<!---->
<!-- - a car, -->
<!-- - a computer -->
<!-- - the atmosphere, -->
<!-- - a unicellular organism, -->
<!-- - a brain, -->
<!-- - a mammal -->
<!---->
<!-- There are many ways in which we study these things. They roughly correspond to scale and mereology, of parts and functions. We have associated techniques for to measuring and testing them at each level. -->
<!-- Some levels map to disciplines like physical, chemical, biological, neurobiological; some are more informational some are emergent; some use analogies of metaphors. We also study them as entire systems, observing their external behaviour, interactions and response to stimuli. -->
<!---->
<!-- Now, play with the idea of studying a deep learning model in a variety of such ways. Can we extract any insight from analogies to those above? -->
<!---->
<!-- To make it a bit more concrete, let's say we have: -->
<!---->
<!-- 1. Intrinsic / Mereological Levels (neurons, layers,...) -->
<!--     - The connection between parts and levels -->
<!--     - Informational aspects, mathematical aspects -->
<!--     - Parts and functions -->
<!--     - How? Is there emergent behaviour? -->
<!--     - Lower level, Higher level -->
<!-- 2. Extrinsic / The system as a totality and its environment -->
<!--     - Testing, -->
<!--     - Fitting simpler models -->
<!---->
<!-- Besides we can think of questions. The questions XAI asks are: How does it make this or that decision? Which inputs were most important? Which questions do we ask elsewhere about such complex systems? How do you trust your dog, or your partner, or another human? -->
<!---->
<!-- However, there may be a critical difference which is DL systems may be used to make decisions in our behalf. But in this case, we can still push the analogy to another human making a decision. What would be require of the human? -->
<!---->
<!-- Where does this analogy hold, where does it break? One currently missing characteristic is for models to be **accountable**, and to be able to learn on the fly, when shown to be wrong. -->
<!---->
<!-- What is quite obvious from the start, is that we do not have access to the lower level model, such as the neurons or the processes within a cell (for a single celled organism). -->
<!---->
<!-- What we have are higher level theories of how they work, and we test them to that extent. A similar thing with other humans. -->
<!---->
<!-- In a way, we are then looking for higher-level theories that makes us trust the model. -->

<!--Removed since did not add much at all for our non-philosophical purposes.-->
<!-- Next the topics of _causes_ and how are answers proposed are discussed, in the context of the _cognitive process_. -->

<!-- ### Causes -->
<!---->
<!-- Aspects of causes already mentioned, but worth putting together, were: -->
<!---->
<!-- - The cognitive process may involve _inferring a cause_. -->
<!-- - Aristotle's proposed 4 kinds of _causal_ answers to a _why-question_. These explanations are not always exclusive, they can be complementary. -->
<!-- - Hume defined _causes_ as _counterfactuals_: A is the cause of B if, had A not happened, B wouldn't have happened. This view was formalised by Pearl and Halpern. -->
<!---->
<!-- _Are all Aristotelian causes Humean causes?_ Efficient causes can be seen as counterfactuals, and both are common in science. The remaining 3 causes are not naturally seen as counterfactuals. -->

<!-- #### Necessary and sufficient -->
<!---->
<!-- Talking about _necessary_ and _sufficient_ causes would've overloaded the example. Briefly, _counterfactuals_ use the word _happen_, so it's an event rather than a condition: The spark of a lighter would be the _cause_ of a fire, but oxygen would still be a _necessary_ cause (or condition, or setting). -->
<!---->
<!-- ### Logic Inference -->
<!---->
<!-- Often, _logic inference_ is used in the cognitive process (deriving a cause). -->
<!---->
<!-- In a **deduction** the _explanans_ combine to yield the _explanandum_. [Studies in the logic of explanation][logic_of_expl_hempel] (1948) argues that, in scientific explanation, _explanans_ are testable conditions and general laws: -->
<!-- > "Why does the phenomenon occur?" is construed as meaning "according to what general laws, and by virtue of what antecedent conditions does the phenomenon occur?" -->
<!---->
<!-- And it _should predict the explanandum, were it unknown_ (hence connecting _prediction_ and _explanation_): -->
<!---->
<!-- > It may be said, therefore, that an explanation of a particular event is not fully adequate unless its explanans, if taken account of in time, could have served as a basis for predicting the event in question. -->
<!---->
<!-- - Example: Light is a wave; all waves interfere; then light beams interfere. -->
<!---->
<!-- In an **induction** a claim is generalised; for example: Bats are mammals; bats fly; maybe all mammals fly. -->
<!---->
<!-- In an **abduction** a hypothesis is proposed which derives the explanandum. This is what is done in the science, and it is a _deduction_, but the difference is that it starts with a hypothesis. -->
<!-- For example: Light shows interference patterns, waves interfere, maybe light is a wave. -->
<!---->
<!-- The _inference to a cause_ is very important and sometimes not obvious. It is made obvious when we do it wrong. For example, imagine that the drawer (in the example) actually slides when we touch it, then our inferred cause was wrong. -->

<!-- The steps above can also be sketched in a graph: -->
<!---->
<!-- ```mermaid -->
<!-- flowchart LR -->
<!--     A(("Answer why-event")) -->
<!--     subgraph hypotheses -->
<!--     B("Caused by A") -->
<!--     C("Caused by B") -->
<!--     D("Assigned to class") -->
<!--     end -->
<!--     subgraph filtered -->
<!--     E("Caused by B") -->
<!--     end -->
<!-- A --suggest all (inferences)--> hypotheses -->
<!-- hypotheses --select best--> filtered -->
<!-- ``` -->
<!-- ## An explanation example -->
<!---->
<!-- You open a drawer, and a conversation with a friend starts. -->
<!---->
<!-- > Friend: Why did the drawer slide out?\ -->
<!-- > You: Because I pulled it out? Had I not, the drawer wouldn't have slide. -->
<!---->
<!-- The answer is an _efficient_ cause. Aristotle proposed 4 causes: _efficient_ (mechanism), _formal_ (form, shape), _material_ (properties), _final_ (purposes). -->
<!---->
<!-- Hume instead, understood causes through _counterfactuals_ such as: _had I not pulled, it wouldn't have slide_. Hence, _pulling_ is the cause. -->
<!---->
<!-- > Friend: I _know_ that. But why does it slide _rather than_ opening like a lid?\ -->
<!-- > You: Oh! I misunderstood. The drawer sits on rails allowing it to slide. -->
<!---->
<!-- The "_rather than_ ..." is a contrast called _foil_, which may be implicit. _Foils_ make answering easier. -->
<!---->
<!-- Notice also the **social process** involved. For example, we tried to guess the friend's actual _knowledge gap_ and be truthful. The friend may decide to keep asking "Why" and eventually reject or accept the causal chain (or remain sceptical). -->
<!---->

<!-- Explanations can be split into an _explanandum_, which is a description of what is explained, and the _explanans_, which are the statements adduced to account for the phenomenon. These definitions are used in what follows. -->
<!---->
<!-- ## An objective account -->
<!---->
<!-- The [Studies in the logic of explanation][logic_of_expl_hempel] (1948) defines scientific explanation in a few places. For example, with emphasis on the question: -->
<!---->
<!-- > To explain the phenomena in the world of our experience, to answer the question "why?" rather than only the question "what?" (...) -->
<!---->
<!-- Or the answer: -->
<!---->
<!-- > The decisive requirement for every sound explanation remains that it subsume the explanandum under general laws [or theories]. -->
<!---->
<!-- They do require that the _explanans_ be testable, believed to be true to a high accuracy, logically lead to the _explanandum_ by means of general laws. -->
<!---->
<!-- In a sense it is a "principled deduction". -->
<!---->
<!-- This definition rarely applies in everyday life, but it _is_ common in mathematics, physics and chemistry. Elsewhere, explanations can't live up to this high standard of "principled deduction" &mdash;and are seldom predictive&mdash; but they also play much wider role, sometimes providing information, or a link between things and so forth. -->
<!---->
<!-- Is there anything unifying all those cases? -->
<!---->
<!-- ## A subjective account -->
<!---->
<!-- On the opposite side, [Explanations, Predictions and Laws][Scriven] argues that no "question word" (_why_ or otherwise) is _necessary_ to define an explanation. -->
<!---->
<!-- The paper highlights the social aspect of an explanation: _explanations_ are a description aiming to fill a gap of understanding (or correct a misunderstanding) to an explainee. -->
<!---->
<!-- In the author's words: -->
<!---->
<!-- > What is it that needs explanation in a given context? It seems clear that it is those things which are not properly understood (by whomever the explanation is addressed to). Now, lack of understanding of a natural phenomenon may be due to the absence of certain information about the situation, to the presence of false beliefs about it, or to an inability to see the connections between what is understood and what is not understood. -->
<!---->
<!-- However, when there is a question, it helps to narrow down the _kind_ of description expected, but are not a defining element. -->
<!---->
<!-- This is closer to the idea of explanation this post uses. -->
<!---->

<!-- Should analyse at least 10 kinds of explanations -->

<!-- ## Cognitive process -->
<!---->
<!-- Generating answers is a complex task. We can consider abstract techniques for generating answers (which concrete methods may implement): -->
<!---->
<!-- - Subsumption into laws (first definition), -->
<!-- - Abduction, or inferring a hypotheses, -->
<!-- - Induction, involving generalisation, -->
<!-- - Deduction, from premises and principles to conclusions, -->
<!-- - Comparison to a reference item, -->
<!-- - Metaphors, analogy and so forth. -->
<!---->
<!-- These will depend on the context which defines what the gap is, what the explainee and explainer are familiar with, the level of detail needed and so forth. Some of these are actually aspects of the social process (next section). -->
<!---->
<!-- Prior beliefs or knowledge are also used to evaluate the answers, and to omit what is considered obvious in the given context (or audience). -->

<!-- #### Causes -->
<!---->
<!-- Defining _cause_ has been a topic of debate. -->
<!---->
<!-- Two important definitions of _cause_ are usually attributed to David Hume: regularity and counterfactual. -->
<!---->
<!-- **Regularity**: an event (cause) is regularly followed by another (effect). Confuses it with _correlation_. -->
<!---->
<!-- **Counterfactuals**: imaginary situation negating (countering) the fact: _What would have happened with Y, had X not happened?_. In that case $X$ causes $Y$ (in a necessary or sufficient manner) if $Y$ is reduced. -->
<!---->
<!-- We can also characterise causes in many ways. First, as probabilistic vs deterministic: -->
<!---->
<!-- **Probabilistic**: $X$ causes $Y$ if $P(Y|X, k) > P(Y)$ i.e. it _increases_ its probability, keeping any other variables ($k$) constant. This and counterfactuals are common conceptions. The number of hunters will be a cause of success at hunting, and is non-deterministic. -->
<!---->
<!-- **Deterministic**: cause-effect is a binary relation, rather than probabilistic. The effect occurs with the cause, and does not without it. -->
<!---->
<!-- **Mixed**: Deterministic and probabistic causes can be mixed as well. -->
<!---->
<!-- Another dimension is _necessary_ and _sufficient_ causes which is skipped for now. -->
<!---->
<!-- The AI researcher Judea Pearl, whose aim was to create thinking machines, proposed a framework to think about causes: -->
<!---->
<!-- 1. Use a causal diagram: a graph made from prior causal knowledge, or find out doing an experiment, -->
<!-- 2. Use a query language: a mathematical expression of what we want to know, which an engine then translates (using the diagram) into a statistics formula. -->
<!---->
<!-- Robots could reach different levels of causal reasoning based on its actions (on the world): 1. Association, 2. Intervention, 3. Imagination. Each level is explained below. -->
<!---->
<!-- An event is **associated** to another if observing one changes the likelihood of observing another, or _regularity_. -->
<!---->
<!-- Many questions can be answered (or events predicted) :_why-question_with this information only, and it's the main area where statistics is used. However, this relates raw-data and in many cases there won't be any causal relationship, like predicting windows from the fact that there is a door, so prediction and causality are different, and in some problems prediction is what is required. -->
<!---->
<!-- For example: _Do taller people have larger feet?_ for example. Or the conditional probability $P(Tall | Large feet)$. But this does not show if there is a causal relation. -->
<!-- Tool: To remove con-founders randomised control trial (RCT) can be used. However, the cause may be something they share rather than one or the other (like a gene). For a process unfolding in time, it will determine the cause. -->
<!---->
<!-- _Intervention_ second rung of the ladder. Involves changing one variable to detect the causal relation , this is, doing an experiment. He wrote this as $P(Y|do(X))$, which is then translated into a statistics formula. -->
<!---->
<!-- _Imagination_ is the top of the ladder. Involves counterfactual thinking, that is, thinking what would happen in a different world, also called _What ifs_. -->
<!--    - Example: What would have happened with his life expectancy, had Joe _not_ taken the drug? -->
<!---->
<!-- We can think of how far certain scientific models (including DL models), living organisms, reach in that ladder, but it's easiest to first read it thinking about robots. -->
<!---->
<!-- > [!Note] -->
<!-- > Counterfactuals involve a fact, which is always in the past, hence a counterfactual it is always retrospective thinking. Planning / predicting are very similar, all involving simulating situations. For planning, humans may synthesize a reference-situation, and "counter-reference" to it as a tool for planning, predicting. For a robot though, the issue would be how to construct this initial situation (which will involve a lot of its history, past experience etc. maybe things like LLMs are good at this.) -->
<!---->
