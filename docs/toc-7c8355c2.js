// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="welcome.html">Welcome</a></span></li><li class="chapter-item expanded "><li class="spacer"></li></li><li class="chapter-item expanded "><li class="part-title">Atom Vectors</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="atom_vectors/intro.html">Introduction</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="atom_vectors/atom2vec.html">Atom2Vec</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="atom_vectors/skipatom.html">SkipAtom</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="atom_vectors/rca.html">RCA</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="atom_vectors/results.html">Results</a></span></li><li class="chapter-item expanded "><li class="spacer"></li></li><li class="chapter-item expanded "><li class="part-title">Explainable AI</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="XAI/concepts.html">Concepts</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="XAI/strategies.html">Linear Methods</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="XAI/strategies_2.html">Visuals and Arch</a></span></li><li class="chapter-item expanded "><li class="spacer"></li></li><li class="chapter-item expanded "><li class="part-title">Discovering Solids</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="DL_aided_exploration_inorg_solids_1.html">Concepts</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="DL_aided_exploration_inorg_solids_2.html">Workflow</a></span></li><li class="chapter-item expanded "><li class="spacer"></li></li><li class="chapter-item expanded "><li class="part-title">Perspective</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="machine_learning_perspective_2019.html">ML Perspective (draft)</a></span></li><li class="chapter-item expanded "><li class="spacer"></li></li><li class="chapter-item expanded "><li class="part-title">Other</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="other/best_practices.html">Best Practices</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="other/databases_and_benchmarks.html">Databases &amp; Benchmarks</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="other/compchem_map.html">CompChem Map</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="other/visualising_high_dimensional_data.html">Visualising N-Dimensions</a></span></li><li class="chapter-item expanded "><li class="spacer"></li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="queries.html">Queries</a></span></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            if (link.href === current_page
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);

