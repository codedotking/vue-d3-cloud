<template>
    <div class="wordcloud" ref="cloudRef" :style="{
        width: width,
        height: height
    }"></div>
</template>
<script setup>
import tippy from 'tippy.js';
import * as d3 from "d3";
import cloud from "d3-cloud";
import { onMounted, ref, watch, nextTick, reactive, toValue, unref, isRef, isReactive, toRefs, toRaw, computed } from "vue";
import { useResizeObserver, useElementSize } from '@vueuse/core'
defineOptions({ name: "WordCloud" });

const props = defineProps({
    words: {
        type: Array,
        default: () => []
    },
    width: {
        type: String,
        default: "500px"
    },
    height: {
        type: String,
        default: "500px"
    }
});


const cloudRef = ref();
const options = reactive({
    width: 0,
    height: 0
})

const text = ref('')


// 实时获取 wordcloud 根据 宽高 和 词云内容
const wordcloud = computed(() => {
    const colors = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf"
    ];
    d3.select(cloudRef.value).select("svg").remove();
    return cloud().size([options.width, options.height])   // 词云大小
        .padding(5)
        .words(toRaw(props.words))
        // 旋转
        .rotate(() => 0)
        // 文字大小
        .fontSize((d) => `${d.size}`)
        .on("end", _words => {
            const svg = d3.select(cloudRef.value).append("svg")
                .attr("width", options.width)
                .attr("height", options.height);
            const g = svg.append("g")
                .attr("width", options.width)
                .attr("height", options.height)
                .attr("transform", `translate(${options.width / 2},${options.height / 2})`);
            const fill = d3.color("d");
            g.selectAll("text")
                .data(_words)
                .enter()
                .append("text")
                .style("font-size", d => {
                    return `${d.size}px`;
                })
                .style("cursor", "pointer")
                // 默认居中
                .attr("text-anchor", "middle")
                // 设置文字颜色
                .attr("fill", () => colors[Math.floor(Math.random() * colors.length)])
                .attr("transform", d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
                .text(d => d.text || "")
                .each(function (d) {
                    tippy(this, {
                        content: () => {
                            return d.text;
                        },
                        theme: 'tomato',
                    });
                });
        });
})

// 实时获取 宽高
useResizeObserver(cloudRef, (entries) => {
    const entry = entries[0]
    const { width, height } = entry.contentRect;
    options.width = width;
    options.height = height;
    wordcloud.value.start()
    text.value = `width: ${width}, height: ${height}`
})

// 词云内容改变重新渲染词云
watch(props.words, () => {
    wordcloud.value.start()
});

onMounted(() => {
    const { width, height } = useElementSize(cloudRef)
    options.width = width.value;
    options.height = height.value;
    nextTick(() => {
        wordcloud.value.start()
    });
});
</script>


<style scoped>
@import url('tippy.js/dist/tippy.css');
</style>
<style>
.tippy-box[data-theme~='tomato'] {
    background-color: white;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    padding: 4px 8px;
}
</style>