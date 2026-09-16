const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
        };
    },
    created() {
        /* 关闭加载层。
           注意这里必须判断 readyState，不能只挂 load 监听：
           Vue 在 DOMContentLoaded 之后才挂载，若此时 load 事件已经触发过
           （本地打开或缓存命中时很常见），再注册监听就永远等不到回调，
           加载层会一直挡住页面。 */
        const hide = () => {
            this.loading = false;
        };
        if (document.readyState === "complete") {
            hide();
        } else {
            window.addEventListener("load", hide);
            /* 兜底：极端情况下（某个资源一直挂起）load 可能迟迟不来，
               最多等 2.5 秒就放行，避免页面被加载层锁死。 */
            setTimeout(hide, 2500);
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");

// Discord-like spoiler reveal behavior
(function initDiscordSpoiler() {
    function reveal(el) {
        if (!el || el.classList.contains("revealed")) return;
        el.classList.add("revealed");
        el.setAttribute("aria-expanded", "true");
    }

    document.addEventListener("click", (e) => {
        const t = e.target;
        if (t && t.classList && t.classList.contains("discord-spoiler")) {
            reveal(t);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const t = e.target;
        if (t && t.classList && t.classList.contains("discord-spoiler")) {
            e.preventDefault();
            reveal(t);
        }
    });
})();
