<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Laporan Estimasi"
        routeEndpoint="laporan-estimasi"
        :items="items"
        :fields="fieldsEstimasi"
        :isLoading="isLoading"
      ></card-list-data>
    </CCol>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import CardListData from '../components/CardListData.vue'
import ToastMsg from '../components/ToastMsg'
import { LaporanService } from '../services/laporan.service'
import { fieldsEstimasi } from './fields'

export default {
  name: 'LaporanEstimasi',
  components: { CardListData, ToastMsg },
  data() {
    return {
      items: [],
      fieldsEstimasi,
      listToasts: [],
      isLoading: false,
    }
  },
  methods: {
    async getEstimasiData() {
      this.isLoading = true
      try {
        const dataEstimasi = await LaporanService.getEstimasiData()

        this.items = dataEstimasi.map(item => {
          item.Record.total = parseInt(item.Record.total).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          })
          return {
            key: item.Key,
            ...item.Record,
            nama_pemohon: item.Record.data_pemohon.nama,
            status_berkas: item.Record.data_pemohon.status_berkas,
          }
        })
      } catch (err) {
        this.listToasts.push({
          message: 'Terjadi masalah. Data estimasi tidak berhasil didapatkan.',
          color: 'danger',
        })
      }
      this.isLoading = false
    },
  },
  async mounted() {
    await this.getEstimasiData()
  },
}
</script>

<style></style>
