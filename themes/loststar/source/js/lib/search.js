mixins.search = {
    data() {
        return { rawSearch: "", searchEmpty: false };
    },
    watch: {
        search(value) {
            let timeline = this.$refs.timeline.childNodes;
            let visible = 0;
            for (let i of timeline) {
                // childNodes 里会夹着文本/注释节点，只处理真正的条目
                if (!i.dataset || typeof i.dataset.title === "undefined") continue;
                if (!value || i.dataset.title.includes(value)) {
                    i.style.opacity = 1;
                    i.style.visibility = "visible";
                    i.style.marginTop = 0;
                    visible++;
                } else {
                    i.style.opacity = 0;
                    i.style.visibility = "hidden";
                    i.style.marginTop = -i.offsetHeight - 30 + "px";
                }
            }
            // 有关键词但一条都没匹配上时，页面会给出提示
            this.searchEmpty = value.length > 0 && visible === 0;
        },
    },
    computed: {
        search() {
            return this.rawSearch.toLowerCase().replace(/\s+/g, "");
        },
    },
};
