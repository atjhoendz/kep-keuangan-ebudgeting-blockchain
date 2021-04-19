/* eslint-disable no-useless-catch */
import axiosService from './axios.service'

export class LaporanService {
  static async getLembagaData() {
    try {
      const response = await axiosService.get('lembaga')

      return response.data.data
    } catch (err) {
      throw err
    }
  }

  static async getAnggaranData() {
    try {
      const response = await axiosService.get('anggaran')

      return response.data.data
    } catch (err) {
      throw err
    }
  }

  static async getEstimasiData() {
    try {
      const response = await axiosService.get('estimasi')

      return response.data.data
    } catch (err) {
      throw err
    }
  }

  static async getBiayaRiilData() {
    try {
      const response = await axiosService.get('biaya-riil')

      return response.data.data
    } catch (err) {
      throw err
    }
  }
}
