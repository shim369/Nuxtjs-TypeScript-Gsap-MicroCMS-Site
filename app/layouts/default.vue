<template>
    <Header />
    <slot />
    <!-- ビューポートに入るまでハイドレーションを遅延(Nuxt の lazy hydration) -->
    <LazyContact hydrate-on-visible />
    <LazyFooter hydrate-on-visible />
</template>
