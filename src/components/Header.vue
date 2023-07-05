<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
        <div class="container">
            <RouterLink class="navbar-brand" :to="{name: 'index'}">Quran</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto">
                <a class="nav-link {{ Request::is('/') ? 'active' : '' }}" href="/">Beranda</a>
                <a class="nav-link {{ Request::is('quran') ? 'active' : '' }}" href="/quran">Quran</a>
                <a class="nav-link {{ Request::is('doa') ? 'active' : '' }}" href="/doa">Doa Harian</a>
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </div>
            </div>
        </div>
    </nav>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>
