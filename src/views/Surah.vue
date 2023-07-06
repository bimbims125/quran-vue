<template>
  <div class="row">
    <div class="mx-auto text-center mb-5">
      <h1 class="arab">{{ dataSurah.nama }}</h1>
      <span class="text-muted text-small">({{ dataSurah.arti }})</span>
      <h3>Surah {{ dataSurah.namaLatin }}</h3>
      <p v-html="dataSurah.deskripsi"></p>
      <audio id="audio-surah" :src="audioFull.data" :ref="audioSurah"></audio>
      <div class="d-flex justify-content-center">
        <button class="btn btn-dark btn-sm mr-2 ayatbtn" @click="playAudioSurah()"><i class="fa-solid fa-play"
            id="ayatbtn"></i>
          &nbsp;Dengarkan Surah</button>
      </div>
    </div>
  </div>
  <p class="font-weight-bold text-small"><i class="fas fa-circle-exclamation"></i>&nbsp; Klik pada teks arab untuk
    mendengarkan audio per-ayat.</p>
  <h2 v-if="route.params.id != 1 && route.params.id != 9" class="arab text-center my-4">بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ</h2>
  <div class="row_ayat" v-for="ayat in dataSurah.ayat">
    <hr>
    <div class="d-flex justify-content-between align-items-start">
      <div class="text-center">
        <div class="p-3 fw-bold bg-dark text-white d-flex justify-content-center align-items-center"
          style="width: 20px; height: 20px;">{{ ayat.nomorAyat }}</div>
        <span data-toggle="tooltip" data-placement="right" title="Tafsir" id="tafsir"><i
            class="fa-regular fa-eye mt-3 text-muted tafsir" data-toggle="modal"
            :data-target="'#exampleModal' + ayat.nomorAyat" style="cursor: pointer;"></i></span>
      </div>
      <div class="audio-container">
        <audio :id="'audio-ayat-'+ayat.nomorAyat" :src="ayat.audio['05']"></audio>
        <h2 class="arab mt-5 text-right ayat" @click="playAudioAyat(ayat.nomorAyat)">{{ ayat.teksArab }}</h2>
      </div>
    </div>
    <p class="mt-4">{{ ayat.teksLatin }}</p>
    <p>{{ ayat.teksIndonesia }}</p>
    <!-- Start Modal -->
    <div class="modal fade" :id="'exampleModal' +  ayat.nomorAyat" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ dataSurah.namaLatin }} Ayat {{ ayat.nomorAyat }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-html="getTafsir(ayat.nomorAyat)"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>

</template>
<style>
  .audio-container:hover {
    color: rgb(29, 186, 186);
    cursor: pointer;
  }
</style>
<script>
  import {
    ref,
    onMounted,
    computed
  } from 'vue'
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  import axios from 'axios';
  export default {
    setup() {
      const dataSurah = ref({})
      const route = useRoute()
      const router = useRouter()
      const dataTafsir = ref([]);
      const audioFull = ref({
        data: ''
      })
      const getTafsir = (nomorAyat) => {
        const tafsir = dataTafsir.value.find(tafsir => tafsir.ayat === nomorAyat);
        return tafsir ? tafsir.teks : '';
      }
      onMounted(async () => {
        // Fetch Ayat from Surah
        await axios.get(`https://equran.id/api/v2/surat/${route.params.id}`)
          .then((result) => {
            dataSurah.value = result.data.data
            audioFull.value.data = result.data.data.audioFull['05']
            console.log(result.data.data);
          }).catch((err) => {
            router.replace({
              name: '404'
            });
          });
        // Fetch Tafsir from Surah
        await axios.get(`https://equran.id/api/v2/tafsir/${route.params.id}`)
          .then((result) => {
            dataTafsir.value = result.data.data.tafsir
          }).catch((err) => {
            console.log(err);
          });
      })

      const playAudioAyat = (nomor) => {
        const audio = document.getElementById('audio-ayat-' + nomor);
        if (audio.paused) {
          audio.play();
          console.log("playing");
        } else {
          audio.pause();
        }
      }
      const playAudioSurah = () => {
        const audio = document.getElementById('audio-surah');
        const button = document.querySelector('.ayatbtn');
        const icon = button.querySelector('i');

        if (audio.paused) {
          audio.play();
          icon.classList.remove('fa-play');
          icon.classList.add('fa-pause');
        } else {
          audio.pause();
          icon.classList.remove('fa-pause');
          icon.classList.add('fa-play');
        }
      };


      return {
        dataSurah,
        getTafsir,
        playAudioAyat,
        playAudioSurah,
        audioFull,
        route
      }
    }
  }
</script>
