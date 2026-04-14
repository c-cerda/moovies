/**
 * Carrusel (index): 3 visibles, bucle de 6 pósters del catálogo (2 copias en cinta),
 * auto cada 5 s y botones ‹ ›.
 */
(function () {
    var INTERVAL_MS = 5000;
    var VISIBLE = 3;
    var SEGMENT_TARGET = 6;
    var COPIES = 2;
    var GAP_PX = 16;
    var WRAP_MS = 850;

    function isExcludedMovie(movie) {
        var t = (movie && movie.titulo ? String(movie.titulo) : '').toLowerCase();
        if (t.indexOf('lobo de wall') !== -1) return true;
        if (/terminator\s*2/.test(t)) return true;
        return false;
    }

    function loadMovies() {
        if (
            typeof window.MOOVIES_SEED !== 'undefined' &&
            Array.isArray(window.MOOVIES_SEED.movies) &&
            window.MOOVIES_SEED.movies.length > 0
        ) {
            return Promise.resolve(window.MOOVIES_SEED.movies);
        }
        return fetch('../json/movies.json').then(function (res) {
            if (!res.ok) throw new Error('No se pudo cargar el catálogo');
            return res.json();
        });
    }

    function buildCells(track, movies) {
        track.textContent = '';
        movies.forEach(function (m) {
            var cell = document.createElement('div');
            cell.className = 'home-carousel__cell';
            cell.setAttribute('role', 'group');
            cell.setAttribute('aria-label', m.titulo || 'Póster');
            var img = document.createElement('img');
            img.className = 'home-carousel__img';
            img.src = m.imagen;
            img.alt = 'Póster: ' + (m.titulo || 'Película');
            img.width = 500;
            img.height = 750;
            img.loading = 'eager';
            img.decoding = 'async';
            img.referrerPolicy = 'no-referrer';
            cell.appendChild(img);
            track.appendChild(cell);
        });
    }

    function init() {
        var root = document.getElementById('homeCarousel');
        var viewport = document.getElementById('homeCarouselViewport');
        var track = document.getElementById('homeCarouselTrack');
        var btnPrev = document.getElementById('homeCarouselPrev');
        var btnNext = document.getElementById('homeCarouselNext');
        if (!root || !viewport || !track) return;

        var segmentLen = 0;
        var indice = 0;
        var timer = null;
        var wrapPending = false;

        function stopTimer() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        function startTimer() {
            stopTimer();
            if (track.children.length <= VISIBLE || wrapPending) return;
            timer = setInterval(tick, INTERVAL_MS);
        }

        function getStepPx() {
            var cells = track.querySelectorAll('.home-carousel__cell');
            if (cells.length < 2) return 0;
            var a = cells[0].getBoundingClientRect();
            var b = cells[1].getBoundingClientRect();
            var d = b.left - a.left;
            return d > 0 ? d : cells[0].offsetWidth + GAP_PX;
        }

        function applyTransform() {
            var step = getStepPx();
            if (step <= 0) return;
            track.style.transform = 'translate3d(-' + indice * step + 'px,0,0)';
        }

        function setButtonsHidden(hidden) {
            if (btnPrev) btnPrev.hidden = hidden;
            if (btnNext) btnNext.hidden = hidden;
        }

        function finishWrapAndResume() {
            track.style.transition = 'none';
            indice = 0;
            applyTransform();
            void track.offsetHeight;
            track.style.transition = '';
            wrapPending = false;
            startTimer();
        }

        function advanceNext() {
            if (track.children.length <= VISIBLE) return;
            if (indice === segmentLen - 1) {
                wrapPending = true;
                stopTimer();
                indice = segmentLen;
                applyTransform();
                window.setTimeout(finishWrapAndResume, WRAP_MS);
                return;
            }
            indice += 1;
            applyTransform();
        }

        function advancePrev() {
            if (track.children.length <= VISIBLE) return;
            if (indice === 0) {
                track.style.transition = 'none';
                indice = segmentLen;
                applyTransform();
                void track.offsetHeight;
                track.style.transition = '';
                indice = segmentLen - 1;
                applyTransform();
                return;
            }
            indice -= 1;
            applyTransform();
        }

        function tick() {
            if (wrapPending) return;
            advanceNext();
        }

        function onResize() {
            var vw = viewport.clientWidth;
            var vh = viewport.clientHeight;
            if (vw <= 0 || vh <= 0) return;

            var cellW = (vw - GAP_PX * (VISIBLE - 1)) / VISIBLE;
            var naturalH = cellW * 1.5;
            if (naturalH > vh) {
                cellW = (vh * 2) / 3;
            }
            var cellH = cellW * 1.5;

            Array.prototype.forEach.call(track.children, function (cell) {
                cell.style.flex = '0 0 ' + cellW + 'px';
                cell.style.width = cellW + 'px';
                cell.style.height = cellH + 'px';
                cell.style.aspectRatio = 'auto';
            });

            if (segmentLen > 0 && indice >= segmentLen) {
                indice = 0;
            }
            applyTransform();
        }

        var ro;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(function () {
                onResize();
            });
            ro.observe(viewport);
        } else {
            window.addEventListener('resize', onResize);
        }

        root.addEventListener('mouseenter', stopTimer);
        root.addEventListener('mouseleave', function () {
            if (!wrapPending) startTimer();
        });

        if (btnNext) {
            btnNext.addEventListener('click', function (e) {
                e.preventDefault();
                if (wrapPending) return;
                stopTimer();
                advanceNext();
                if (!wrapPending) startTimer();
            });
        }
        if (btnPrev) {
            btnPrev.addEventListener('click', function (e) {
                e.preventDefault();
                if (wrapPending) return;
                stopTimer();
                advancePrev();
                startTimer();
            });
        }

        loadMovies()
            .then(function (movies) {
                var filtered = (movies || []).filter(function (m) {
                    return m && m.imagen && !isExcludedMovie(m);
                });
                if (!filtered.length) {
                    root.setAttribute('hidden', '');
                    setButtonsHidden(true);
                    return;
                }
                var base = filtered.slice(0, SEGMENT_TARGET);
                if (base.length < SEGMENT_TARGET) {
                    var orig = filtered.slice();
                    var j = 0;
                    while (base.length < SEGMENT_TARGET) {
                        base.push(orig[j % orig.length]);
                        j += 1;
                    }
                }
                if (base.length < VISIBLE) {
                    var o2 = base.slice();
                    var k = 0;
                    while (base.length < VISIBLE) {
                        base.push(o2[k % o2.length]);
                        k += 1;
                    }
                }
                segmentLen = base.length;
                var trackList = [];
                var c;
                for (c = 0; c < COPIES; c++) {
                    trackList = trackList.concat(base);
                }
                buildCells(track, trackList);
                indice = 0;
                track.style.transform = 'translate3d(0,0,0)';
                setButtonsHidden(track.children.length <= VISIBLE);

                function layoutAndStart() {
                    onResize();
                    applyTransform();
                    wrapPending = false;
                    stopTimer();
                    startTimer();
                }

                requestAnimationFrame(function () {
                    requestAnimationFrame(layoutAndStart);
                });
            })
            .catch(function () {
                root.setAttribute('hidden', '');
                setButtonsHidden(true);
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
