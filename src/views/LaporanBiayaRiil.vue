<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Laporan Biaya Riil"
        :items="items"
        :fields="fieldsBiayaRiil"
        routeEndpoint="laporan-biaya-riil"
        :isLoading="isLoading"
        :showButton="false"
      >
      </card-list-data>
    </CCol>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import CardListData from '../components/CardListData.vue'
import ToastMsg from '../components/ToastMsg'
import { LaporanService } from '../services/laporan.service'
import { fieldsBiayaRiil } from './fields'

export default {
  name: 'LaporanBiayaRiil',
  components: { CardListData, ToastMsg },
  data() {
    return {
      items: [],
      fieldsBiayaRiil,
      listToasts: [],
      isLoading: false,
    }
  },
  methods: {
    async getBiayaRiilData() {
      this.isLoading = true
      try {
        const dataBiayaRiil = await LaporanService.getBiayaRiilData()

        this.items = dataBiayaRiil.map(item => {
          item.Record.total = parseInt(item.Record.total).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          })
          return {
            key: item.Key,
            ...item.Record,
            nama_pemohon: item.Record.data_pemohon.nama,
          }
        })
      } catch (err) {
        this.listToasts.push({
          message:
            'Terjadi masalah. Data biaya riil tidak berhasil didapatkan.',
          color: 'danger',
        })
      }
      this.isLoading = false
    },
  },
  async mounted() {
    await this.getBiayaRiilData()
  },
}
</script>

<style></style>
