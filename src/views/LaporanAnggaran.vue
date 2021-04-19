<template>
  <CRow>
    <CCol sm="12" md="6" lg="5">
      <card-list-data
        title="Laporan Anggaran"
        :items="items"
        :fields="fieldsAnggaran"
        routeEndpoint="laporan-anggaran"
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
import { fieldsAnggaran } from './fields'

export default {
  name: 'LaporanLembaga',
  components: { CardListData, ToastMsg },
  data() {
    return {
      items: [],
      fieldsAnggaran,
      listToasts: [],
      isLoading: false,
    }
  },
  methods: {
    async getDataAnggaran() {
      this.isLoading = true
      try {
        const dataAnggaran = await LaporanService.getAnggaranData()

        this.items = dataAnggaran.map(item => {
          item.Record.sisa_anggaran = parseInt(
            item.Record.sisa_anggaran
          ).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          })
          return {
            key: item.Key,
            ...item.Record,
          }
        })
      } catch (err) {
        this.listToasts.push({
          message: 'Terjadi masalah. Data anggaran tidak berhasil didapatkan.',
          color: 'danger',
        })
      }
      this.isLoading = false
    },
  },
  async mounted() {
    await this.getDataAnggaran()
  },
}
</script>

<style></style>
