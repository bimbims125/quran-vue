<template>

    <div class="container mt-5">
      <form action="">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text bg-dark text-white" id="basic-addon1"><i
                  class="fa-solid fa-magnifying-glass"></i></span>
            </div>
            <input v-model="cari" type="search" class="form-control" placeholder="Cari... (Al-fatihah, dst)" aria-label="Cari">
          </div>
        </div>
      </form>
      <div class="row card-equal-height" v-if="cariSurah.length > 0">
        <div class="col-12 col-lg-6 col-xl-4 mt-2" v-for="surah in cariSurah">
          <RouterLink :to="{name: 'surah',params:{id:surah.id}}" class="card text-decoration-none text-dark">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div
                  class="p-3 fw-bold bg-dark text-white rounded d-flex justify-content-center align-items-center rounded mr-3"
                  style="width: 50px; height: 50px;">{{ surah.id }}</div>
                <div class="w-100">
                  <div class="d-flex w-100 justify-content-between">
                    <div class="">
                      <h5 class="heading-surah">{{ surah.name_simple }}</h5>
                    </div>
                    <div class="">
                      <h6 class="arab text-end">{{ surah.name_arabic }}</h6>
                    </div>
                  </div>
                  <div class="d-flex w-100 justify-content-between">
                    <div class="">
                      <span class="text-muted text-small">{{ surah.translated_name.name }}</span>
                    </div>
                    <div class="">
                      <span class="text-muted text-small">{{surah.verses_count}} Ayat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
      <div class="" v-else>
        <h3 class="text-center">Tidak Ada Surah bernama {{ cari }}</h3>
      </div>
    </div>

</template>

<script>
  import {
    ref,
    onMounted,
    computed
  } from 'vue'
  import axios from 'axios';
  export default {
    setup() {

      const dataSurah = ref([])
      const cari = ref('')
      onMounted(async () => {
        await axios.get("https://api.quran.com/api/v4/chapters?language=id")
          .then((result) => {
            dataSurah.value = result.data.chapters
            console.log(result.data)
          }).catch((err) => {

          });
      })
      const cariSurah = computed(()=>{
        return dataSurah.value.filter(dataSurah => dataSurah.name_simple.includes(cari.value));
      })
      return {
        dataSurah,
        cari,
        cariSurah
      }
    }
  }
</script>
