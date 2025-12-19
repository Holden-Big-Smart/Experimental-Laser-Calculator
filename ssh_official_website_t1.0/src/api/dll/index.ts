import { dllCalculateBrewsterAndCriticalAnglesParam, dllBaseunitCalAtmKpammHgTorrmBarParam, dllBaseunitCalFreAndWaveNumAndEnergybyWidthParam, dllBaseunitCalFreqAndWaveNumAndEnergyParam, dllBaseunitCalPaAtmKpaTorrmBarParam, dllBaseunitCalPaAtmKpammHgmBarParam, dllBaseunitCalPaAtmKpammHgmTorrParam, dllBaseunitCalPaAtmmmHgTorrmBarParam, dllBaseunitCalPaKpammHgTorrmBarParam, dllBaseunitCalWaveLenAndFreqAndEnergyParam, dllBaseunitCalWaveLenAndFreqAndWaveNumParam, dllBaseunitCalWaveLenAndWaveNumAndEnergyParam, dllBaseunitCalWaveWidthAndFreqAndEnergybyWidthParam, dllBaseunitCalWaveWidthAndFreqAndWaveNumbyWidthParam, dllBaseunitCalWaveWidthAndWaveNumAndEnergybyWidthParam, dllBaseunitCaldBmParam, dllBaseunitCalmWParam, dllCalcRayleighLengthParam, dllCalculateBeamParametersParam, dllCalculateBeamWidthsParam, dllCalculateDiffractionLimitParam, dllCalculateDispersionParam, dllCalculateFocalLengthParam, dllCalculateGaussianBeamParametersParam, dllCalculateGratingParametersParam, dllCalculateLParam, dllCalculateOPABestNonLinearAngleParam, dllCalculateOPAForAngleRangeListParam, dllCalculateOPAParameterListParam, dllCalculateOPAParameterList2Param, dllCalculateOPAParametersParam, dllCalculateOPAParametersForAngleRangeParam, dllCalculateOPAParametersForPumpPowerParam, dllCalculateOPAParametersForPumpRangeParam, dllCalculateOPAParametersForSignalRangeParam, dllCalculatePulseCompressionParam, dllCalculateRPParam, dllCalculateRayleighCriterionAbbeLimitParam, dllCalculateW02AndFParam, dllCalculateZValuesParam, dllClssCalMaterialDispersionParam, dllClssCalMaterialDispersionListParam, dllCpaCalCPAofMartinezGratingParam, dllDgsCalGratingParametersParam, dllDgsCalGratingParametersListforIncidentParam, dllDgsCalGratingParametersListforWavelengthParam, dllDgsCalGratingParametersListforlinesPerMmParam, dllDgskjssCalMultiGrattingParametersParam, dllFnerCalRefractivePropertiesParam, dllFnerCalRefractivePropertiesListParam, dllGclCalOPA3ForPumpPowerListParam, dllGclCalOPA3ForPumpWaveListParam, dllGclCalOPA3ForSignalwaveListParam, dllGclCalOPAForAngleRangeParam, dllGclCalOPAForAngleRangeListParam, dllGlmdCalEnergyByPowerRepRateParam, dllGlmdCalFRadiusByRadiusWavelensParam, dllGlmdCalPowerDensityByEnergyPluseWidthRadiusParam, dllGlmdCalPowerDensityByPowerPluseWidthRadiusParam, dllGlmdCalPowerDensityByPowerPluseWidthRadiusWaveLenParam, dllGsCalFocalLengthsiParam, dllGsCalImageDistanceParam, dllMartCalMartinezDispersionParam, dllMartCalMartinezDispersionByPulseWidthParam, dllMartCalMartinezDispersionBySpectrumParam, dllMartCalMartinezDispersionBySpectrumAndPulseWidthParam, dllMartCalMartinezDispersionListByDParam, dllMartCalMartinezDispersionListByGamaParam, dllMartCalMartinezDispersionListByLParam, dllMartCalMartinezDispersionListByRParam, dllMartCalMartinezDispersionListByWaveParam, dllOffnerCalOffnerDispersionParam, dllOffnerCalOffnerDispersionByPulseWidthParam, dllOffnerCalOffnerDispersionBySpectrumParam, dllOffnerCalOffnerDispersionBySpectrumAndPulseWidthParam, dllOffnerCalOffnerDispersionListByDParam, dllOffnerCalOffnerDispersionListByGamaParam, dllOffnerCalOffnerDispersionListByLParam, dllOffnerCalOffnerDispersionListByRParam, dllOffnerCalOffnerDispersionListByWaveParam, dllPerformCalculationParam, dllPerformCalculationsParam, dllQccpCalLaserLParam, dllQccpCalLaserRPParam, dllSjCalCavityByFourMirrorsHorParam, dllSjCalCavityByFourMirrorsVerParam, dllSjdgCalChirpMTParam, dllSjdgCalLaserPluseWidthParam, dllSjdgCalLaserSpectrumWidthParam, dllSzsCalBirefringenceSpectrumListParam, dllSzsCalBirefringenceSpectrumSingleListParam, dllUnitsysCalOPA1ForSignalWaveListParam } from "./types"
import { BaseEntity } from "../types/api-types"
import { AxiosRequestConfig } from "axios"
import request from "@/utils/request"

/** 1.布氏角全反角(测试未成功)*/
export function dllCalculateBrewsterAndCriticalAngles(params?: dllCalculateBrewsterAndCriticalAnglesParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/CalculateBrewsterAndCriticalAngles",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.9基本单位-单位换算  压强、真空度的转换//输出：result[0] 单位：Atm
//输出：result[1] 单位：Kpa
//输出：result[2] 单位：mmHg
//输出：result[3] 单位：Torr
//输出：result[4] 单位：mBar*/
export function dllBaseunitCalAtmKpammHgTorrmBar(params?: dllBaseunitCalAtmKpammHgTorrmBarParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calAtmKpammHgTorrmBar",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.5基本单位-单位换算 波长、频率、波数的转换//输出：result[0] 频率 单位：GHz
//输出：result[1] 波数 单位：1/cm
//输出：result[2] 能量 单位：eV*/
export function dllBaseunitCalFreAndWaveNumAndEnergybyWidth(params?: dllBaseunitCalFreAndWaveNumAndEnergybyWidthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calFreAndWaveNumAndEnergybyWidth",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.1基本单位-单位换算 波长、频率、波数的转换//输出：result[0] 频率 单位：GHz
//输出：result[1] 波数 单位：1/cm
//输出：result[2] 能量 单位：eV*/
export function dllBaseunitCalFreqAndWaveNumAndEnergy(params?: dllBaseunitCalFreqAndWaveNumAndEnergyParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calFreqAndWaveNumAndEnergy",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.12基本单位-单位换算 压强、真空度的转换//输出：result[0] 单位：Pa
//输出：result[1] 单位：Atm
//输出：result[2] 单位：Kpa
//输出：result[3] 单位：Torr
//输出：result[4] 单位：mBar*/
export function dllBaseunitCalPaAtmKpaTorrmBar(params?: dllBaseunitCalPaAtmKpaTorrmBarParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calPaAtmKpaTorrmBar",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.13基本单位-单位换算 压强、真空度的转换//输出：result[0] 单位：Pa
//输出：result[1] 单位：Atm
//输出：result[2] 单位：Kpa
//输出：result[3] 单位：mmHg
//输出：result[4] 单位：mBar*/
export function dllBaseunitCalPaAtmKpammHgmBar(params?: dllBaseunitCalPaAtmKpammHgmBarParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calPaAtmKpammHgmBar",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.14基本单位-单位换算 压强、真空度的转换//输出：result[0] 单位：Pa
//输出：result[1] 单位：Atm
//输出：result[2] 单位：Kpa
//输出：result[3] 单位：mmHg
//输出：result[4] 单位：Torr*/
export function dllBaseunitCalPaAtmKpammHgmTorr(params?: dllBaseunitCalPaAtmKpammHgmTorrParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calPaAtmKpammHgmTorr",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.11基本单位-单位换算 压强、真空度的转换//输出：result[0] 单位：Pa
//输出：result[1] 单位：Atm
//输出：result[2] 单位：mmHg
//输出：result[3] 单位：Torr
//输出：result[4] 单位：mBar*/
export function dllBaseunitCalPaAtmmmHgTorrmBar(params?: dllBaseunitCalPaAtmmmHgTorrmBarParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calPaAtmmmHgTorrmBar",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.10基本单位-单位换算 压强、真空度的转换//输出：result[0] 单位：Pa
//输出：result[1] 单位：Kpa
//输出：result[2] 单位：mmHg
//输出：result[3] 单位：Torr
//输出：result[4] 单位：mBar*/
export function dllBaseunitCalPaKpammHgTorrmBar(params?: dllBaseunitCalPaKpammHgTorrmBarParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calPaKpammHgTorrmBar",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.3基本单位-单位换算 波长、频率、波数的转换//输出：result[0] 波长 单位：nm
//输出：result[1] 频率：GHz
//输出：result[2] 能量 单位：eV*/
export function dllBaseunitCalWaveLenAndFreqAndEnergy(params?: dllBaseunitCalWaveLenAndFreqAndEnergyParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calWaveLenAndFreqAndEnergy",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.4基本单位-单位换算 波长、频率、波数的转换//输出：result[0] 波长 单位：nm
//输出：result[1] 频率：GHz
//输出：result[2] 波数 单位：1/cm*/
export function dllBaseunitCalWaveLenAndFreqAndWaveNum(params?: dllBaseunitCalWaveLenAndFreqAndWaveNumParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calWaveLenAndFreqAndWaveNum",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.2基本单位-单位换算 波长、频率、波数的转换//输出：result[0] 波长 单位：nm
//输出：result[1] 波数 单位：1/cm
//输出：result[2] 能量 单位：eV*/
export function dllBaseunitCalWaveLenAndWaveNumAndEnergy(params?: dllBaseunitCalWaveLenAndWaveNumAndEnergyParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calWaveLenAndWaveNumAndEnergy",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.7基本单位-单位换算 波长、频率、波数的转换//输出：result[0] 线宽 单位：nm
//输出：result[1] 波数 单位：1/cm
//输出：result[2] 能量 单位：eV*/
export function dllBaseunitCalWaveWidthAndFreqAndEnergybyWidth(params?: dllBaseunitCalWaveWidthAndFreqAndEnergybyWidthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calWaveWidthAndFreqAndEnergybyWidth",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.8基本单位-单位换算 波长、频率、波数的转换//输出：result[0] 线宽 单位：nm
//输出：result[1] 频率 单位：GHz
//输出：result[2] 波数 单位：1/cm*/
export function dllBaseunitCalWaveWidthAndFreqAndWaveNumbyWidth(params?: dllBaseunitCalWaveWidthAndFreqAndWaveNumbyWidthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calWaveWidthAndFreqAndWaveNumbyWidth",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.6基本单位-单位换算 波长、频率、波数的转换//输出：result[0] 线宽 单位：nm
//输出：result[1] 波数 单位：1/cm
//输出：result[2] 能量 单位：eV*/
export function dllBaseunitCalWaveWidthAndWaveNumAndEnergybyWidth(params?: dllBaseunitCalWaveWidthAndWaveNumAndEnergybyWidthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calWaveWidthAndWaveNumAndEnergybyWidth",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.15基本单位-单位换算  功率或者倍数的转换输出：result[0] 单位：dBm*/
export function dllBaseunitCaldBm(params?: dllBaseunitCaldBmParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/caldBm",
    method: "get",
    params,
    ...config
  })
}

/** 1.1.16基本单位-单位换算 功率或者倍数的转换输出：result[0] 单位：mW*/
export function dllBaseunitCalmW(params?: dllBaseunitCalmWParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/baseunit/calmW",
    method: "get",
    params,
    ...config
  })
}

/** 测试用瑞利长度计算 data输出参数(Double)瑞利长度*/
export function dllCalcRayleighLength(params?: dllCalcRayleighLengthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calcRayleighLength",
    method: "get",
    params,
    ...config
  })
}

/** 4.2高斯光束*/
export function dllCalculateBeamParameters(params?: dllCalculateBeamParametersParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateBeamParameters",
    method: "get",
    params,
    ...config
  })
}

/** 4.6高斯光束*/
export function dllCalculateBeamWidths(params?: dllCalculateBeamWidthsParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateBeamWidths",
    method: "get",
    params,
    ...config
  })
}

/** 2.1衍射极限计算*/
export function dllCalculateDiffractionLimit(params?: dllCalculateDiffractionLimitParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateDiffractionLimit",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统-等效光栅对2*/
export function dllCalculateDispersion(params?: dllCalculateDispersionParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateDispersion",
    method: "get",
    params,
    ...config
  })
}

/** 4.3高斯光束*/
export function dllCalculateFocalLength(params?: dllCalculateFocalLengthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateFocalLength",
    method: "get",
    params,
    ...config
  })
}

/** 4.1高斯光束*/
export function dllCalculateGaussianBeamParameters(params?: dllCalculateGaussianBeamParametersParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateGaussianBeamParameters",
    method: "get",
    params,
    ...config
  })
}

/** 6.光栅计算 data 结果输出（double*）pdResult[0]	结果衍射角(单位度)
结果输出（double*）pdResult[1]	结果利特罗角(单位度)

*/
export function dllCalculateGratingParameters(params?: dllCalculateGratingParametersParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateGratingParameters",
    method: "get",
    params,
    ...config
  })
}

/** 5.2腔长重频*/
export function dllCalculateL(params?: dllCalculateLParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateL",
    method: "get",
    params,
    ...config
  })
}

/** 1.1最佳非共线角计算 data 输出数组长度为6
result[0]空闲光波长（um）
result[1]最佳非共线角 弧度
result[2]相位匹配角 弧度
result[3]参量带宽 nm
result[4]增益倍数
result[5]增益带宽 nm
*/
export function dllCalculateOPABestNonLinearAngle(params?: dllCalculateOPABestNonLinearAngleParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateOPABestNonLinearAngle",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统- 临时*/
export function dllCalculateOPAForAngleRangeList(params?: dllCalculateOPAForAngleRangeListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateOPAForAngleRangeList",
    method: "get",
    params,
    ...config
  })
}

/** 1.2不同非共线角的结果计算 data 输出二维数组长度为4
[0][]参量带宽数组指针（nm），数组长度为输入参数的iCount
[1][]相位匹配角度数值指针（弧度）, 数组长度为输入参数的iCount
[2][]增益倍数，数组长度为输入参数的iCount
[3][]增益带宽（nm），数组长度为输入参数的iCount
*/
export function dllCalculateOPAParameterList(params?: dllCalculateOPAParameterListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateOPAParameterList",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统-功能2*/
export function dllCalculateOPAParameterList2(params?: dllCalculateOPAParameterList2Param, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateOPAParameterList2",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统-功能6*/
export function dllCalculateOPAParameters(params?: dllCalculateOPAParametersParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateOPAParameters",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统-功能1*/
export function dllCalculateOPAParametersForAngleRange(params?: dllCalculateOPAParametersForAngleRangeParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateOPAParametersForAngleRange",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统- 功能5*/
export function dllCalculateOPAParametersForPumpPower(params?: dllCalculateOPAParametersForPumpPowerParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateOPAParametersForPumpPower",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统-功能4*/
export function dllCalculateOPAParametersForPumpRange(params?: dllCalculateOPAParametersForPumpRangeParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateOPAParametersForPumpRange",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统-功能3*/
export function dllCalculateOPAParametersForSignalRange(params?: dllCalculateOPAParametersForSignalRangeParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateOPAParametersForSignalRange",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统-等效光栅对4*/
export function dllCalculatePulseCompression(params?: dllCalculatePulseCompressionParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculatePulseCompression",
    method: "get",
    params,
    ...config
  })
}

/** 5.1腔长重频*/
export function dllCalculateRP(params?: dllCalculateRPParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateRP",
    method: "get",
    params,
    ...config
  })
}

/** 2.2衍射极限计算*/
export function dllCalculateRayleighCriterionAbbeLimit(params?: dllCalculateRayleighCriterionAbbeLimitParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateRayleighCriterionAbbeLimit",
    method: "get",
    params,
    ...config
  })
}

/** 4.5高斯光束*/
export function dllCalculateW02AndF(params?: dllCalculateW02AndFParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateW02AndF",
    method: "get",
    params,
    ...config
  })
}

/** 4.4高斯光束*/
export function dllCalculateZValues(params?: dllCalculateZValuesParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/calculateZValues",
    method: "get",
    params,
    ...config
  })
}

/** 2.3.1 calMaterialDispersion 计算材料色散
输入参数 //输入 material：材料名称
//输入 wavelength：激光中心波长，单位为 nm
//输入 Materiallength:材料长度，单位 mm
输出结果 //输出 result[0]：折射率
//输出 result[1]：相位 1（GD）
//输出 result[2]：相位 2（GDD）
//输出 result[3]：相位 3（TOD）
//输出 result[4]：相位 4（FOD）
*/
export function dllClssCalMaterialDispersion(params: dllClssCalMaterialDispersionParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/clss/calMaterialDispersion",
    method: "get",
    params,
    ...config
  })
}

/** 2.3.2 calMaterialDispersionList 计算材料色散序列
//输入 material：材料名称
//输入 startWavelength：起始波长，单位为 nm
//输入 endWavelength：结束波长，单位为 nm
//输入 int iCount：计算点数
//输入 Materiallength：材料长度，单位为 mm对于每个波长点，数组将依次包含折射率、GDD,TOD 和 x 轴的值
波长（nm)，因此数组的总长度将是 iCount * 4 四个一组//输出 result[i*4+0]：折射率序列
//输出 result[i*4+1]：GDD 序列
//输出 result[i*4+2]：TOD 序列
//输出 result[i*4+3]：波长序列
*/
export function dllClssCalMaterialDispersionList(params: dllClssCalMaterialDispersionListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/clss/calMaterialDispersionList",
    method: "get",
    params,
    ...config
  })
}

/** 4.1.1CPA 系统的各个环节的色散值
输入参数 //输入 wave0：中心波长，单位为 nm
//输入 wave：追迹光波长，单位为 nm
//输入 gama：展宽器光栅入射角，单位为度
//输入 d：展宽器光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为 mm
//输入 l：光栅到凹面镜中心距离，单位为 mm
//输入 n：展宽器展宽程数，无单位
//输入 gama1：光栅入射角，单位为度
//输入 lg：光栅对间距，单位为 mm
//输入 d1：光栅刻线密度，单位为线/mm
//输入 n1：压缩程数，无单位
//输入 material1：材料名称
//输入 material2：材料名称
//输入 material3：材料名称
//输入 material4：材料名称
//输入 material5：材料名称
//输入 material6：材料名称
//输入 material7：材料名称
//输入 material8：材料名称
//输入 material9：材料名称
//输入 material10：材料名称
//输入 Materiallength1:材料长度，单位 mm
//输入 Materiallength2:材料长度，单位 mm
//输入 Materiallength3:材料长度，单位 mm
//输入 Materiallength4:材料长度，单位 mm
//输入 Materiallength5:材料长度，单位 mm
//输入 Materiallength6:材料长度，单位 mm
//输入 Materiallength7:材料长度，单位 mm
//输入 Materiallength8:材料长度，单位 mm
//输入 Materiallength9:材料长度，单位 mm
//输入 Materiallength10:材料长度，单位 mm
//输入 gd:附加色散 fs
//输入 gdd:附加色散 fs2
//输入 tod:附加色散 fs3
//输入 fod:附加色散 fs4
输出结果 //输出 double* result：结果数组指针，包含以下元素
//输出 展宽器的一到四阶色散
//输出 result[0]：GD，一阶色散,单位 fs
//输出 result[1]：GDD，二阶色散,单位 fs2
//输出 result[2]：TOD，三阶色散,单位 fs3
//输出 result[3]：FOD，四阶色散,单位 fs4
//输出 材料的一到四阶色散
//输出 result[4]：GD，一阶色散,单位 fs
//输出 result[5]：GD，二阶色散,单位 fs2
//输出 result[6]：GD，三阶色散,单位 fs3
//输出 result[7]：GD，四阶色散,单位 fs4
//输出 如果压缩器参数有效
//输出 result[8]：第一组压缩器光栅入射角（度）
//输出 result[9]：光栅对间距（mm）
//输出 result[10]：第二组压缩器光栅入射角（度）
//输出 result[11]：光栅对间距（mm）
//输出 系统总色散
//输出 result[12]：GD，一阶色散,单位 fs
//输出 result[13]：GDD，二阶色散,单位 fs2
//输出 result[14]：TOD，三阶色散,单位 fs3
//输出 result[15]：FOD，四阶色散,单位 fs4
*/
export function dllCpaCalCPAofMartinezGrating(params: dllCpaCalCPAofMartinezGratingParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/cpa/calCPAofMartinezGrating",
    method: "get",
    params,
    ...config
  })
}

/** 3.1.1计算衍射角和利特罗角  测试不通过
//输入 dTetai （单位：度）
//输入 ddWavelength 波长（单位：纳米）
//输入 dNlinesPerMm 每毫米线对数
//输入 iDiffractionOrder 衍射级次
//输出 result[0] 衍射角 单位：度
//输出 result[1] 利特罗角 单位：度*/
export function dllDgsCalGratingParameters(params?: dllDgsCalGratingParametersParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/dgs/calGratingParameters",
    method: "get",
    params,
    ...config
  })
}

/** 3.1.2根据不同入射角计算衍射角和利特罗角序列  测试不通过
//输入 起始入射角 startTetai （单位：度）
//输入 结束入射角 endTetai （单位：度）
//输入 计算点数iCount
//输入 ddWavelength 波长（单位：纳米）
//输入 dNlinesPerMm 每毫米线对数
//输入 iDiffractionOrder 衍射级次
//输出 result[0] 衍射角 单位：度
//输出 result[1] 利特罗角 单位：度*/
export function dllDgsCalGratingParametersListforIncident(params?: dllDgsCalGratingParametersListforIncidentParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/dgs/calGratingParametersListforIncident",
    method: "get",
    params,
    ...config
  })
}

/** 3.1.3根据不同波长计算衍射角和利特罗角//输入 dTetai （单位：度）
//输入 startWavelength 起始波长（单位：纳米）
//输入 endWavelength 结束波长（单位:纳米）
//输入 计算点数iCount
//输入 dNlinesPerMm 每毫米线对数
//输入 iDiffractionOrder 衍射级次
//输出 result[0] 衍射角 单位：度
//输出 result[1] 利特罗角 单位：度
返回数组总长度为 iCount*2,其中衍射角序列：result[0+idx*2]；
利特罗角序列：result[1+idx*2]
*/
export function dllDgsCalGratingParametersListforWavelength(params?: dllDgsCalGratingParametersListforWavelengthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/dgs/calGratingParametersListforWavelength",
    method: "get",
    params,
    ...config
  })
}

/** 3.1.4根据线对数计算衍射角和利特罗角//输入 dTetai （单位：度）
//输入 dWavelength 起始波长（单位：纳米）
//输入 startNlinesPerMm 起始每毫米线对数
//输入 endNlinesPerMm 结束每毫米线对数
//输入 计算点数iCount
//输入 iDiffractionOrder 衍射级次
//输出 result[0] 衍射角 单位：度
//输出 result[1] 利特罗角 单位：度
返回数组总长度为 iCount*2,其中衍射角序列：result[0+idx*2]；
利特罗角序列：result[1+idx*2]
*/
export function dllDgsCalGratingParametersListforlinesPerMm(params?: dllDgsCalGratingParametersListforlinesPerMmParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/dgs/calGratingParametersListforlinesPerMm",
    method: "get",
    params,
    ...config
  })
}

/** 3.2.1计算多光栅空间色散（非平行光栅）//输入lt1: 激光中心波长，单位为nm
//输入lt2: 频率带宽，单位GHz 删除
//输入lt3: 纵横间隔，单位为GHz
//输入lt4: 光斑直径，单位为mm
//输入lt5: 空间角色散，单位deg/nm
//输入gt1: 激光入射角，单位为deg
//输入gt2: 光栅刻线，单位为线/mm
//输入gt3: 衍射级，单位级 删除
//输入gt5: 光栅通过次数，单位次
//输入ft1: 透镜焦距，单位mm
//输出result: 结果数组，用于存储计算结果，数组总长度为4+gt5*3
//输出result[0]:最终光斑间距，单位为毫米
//输出result[1]:最终光斑直径，单位为毫米
//输出result[2]:0 or 1 表示能否分辨
//输出result[3+0+step]:中心波长衍射角 单位为度
//输出result[3+1+step]:角色散 单位为度/nm
//输出result[3+2+step]:焦平面光斑间距  单位为mm
//输出result[lastIndex]:次数*/
export function dllDgskjssCalMultiGrattingParameters(params?: dllDgskjssCalMultiGrattingParametersParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/dgskjss/calMultiGrattingParameters",
    method: "get",
    params,
    ...config
  })
}

/** 2.2.1 calRefractiveProperties 计算折射角
输入参数 //输入 wavelength 光波的波长，单位为纳米（nm）
//输入 incidentAngle 光波的入射角，单位为度
//输入 material 材料名称
输出结果 //输出 result[0] refractedAngle
//输出 result[1] Rp
//输出 result[2] Rs
//输出 result[3] Tp
//输出 result[4] Ts*/
export function dllFnerCalRefractiveProperties(params: dllFnerCalRefractivePropertiesParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/fner/calRefractiveProperties",
    method: "get",
    params,
    ...config
  })
}

/** 2.2.2 calRefractivePropertiesList 计算折射角序列
输入参数 //输入 wavelength 光波的波长，单位为纳米（nm）
//输入 startIncidentAngle 起始入射角（度）
//输入 endIncidentAngle 结束入射角（度）
//输入 iCount 计算点数
//输入 material 材料名称
输出结果 //输出 result[0] 入射角（度）序列
//输出 result[1] Rp 序列
//输出 result[2] Rs 序列
//输出 result[3] Tp 序列
//输出 result[4] Ts 序列
//输出 result[5] Rn 序列
//输出 result[6] Tn 序列
*/
export function dllFnerCalRefractivePropertiesList(params: dllFnerCalRefractivePropertiesListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/fner/calRefractivePropertiesList",
    method: "get",
    params,
    ...config
  })
}

/** 4.3.3计算 泵浦光功率密度作为变量//输入 materialName：晶体名称
//输入 xs：信号光波长，单位为nm
//输入 xp：泵浦光波长，单位为nm
//输入 lc：非线性晶体长度，单位为mm
//输入 iCount：计算点数，即需要计算的泵浦光强度个数
//输入 startIp：起始泵浦功率密度，单位为GW/cm²
//输入 endIp：结束泵浦功率密度，单位为GW/cm²
//输出 results数组，总长度为2*iCount
//输出 results[0+step]:x轴值泵浦功率密度(GW/cm²)
//输出 results[1+step]:增益带宽（nm）*/
export function dllGclCalOPA3ForPumpPowerList(params?: dllGclCalOPA3ForPumpPowerListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/gcl/calOPA3ForPumpPowerList",
    method: "get",
    params,
    ...config
  })
}

/** 4.3.2计算 泵浦光波长作为变量//输入 materialName：晶体名称
//输入 xs：信号光波长，单位为nm
//输入 startxp：起始泵浦波长，单位为nm
//输入 endxp：结束泵浦波长，单位为nm
//输入 lc：非线性晶体长度，单位为mm
//输入 Ip：泵浦功率密度，单位为GW/cm²
//输入 deff：有效非线性系数，单位为pm/V
//输入 iCount：计算点数，即需要计算的泵浦波长个数
//输出 results数组，总长度为6*iCount
//输出 results[0+step]:非共线角（度）
//输出 results[1+step]:相位匹配角（度）
//输出 results[2+step]:参量带宽（nm）
//输出 results[3+step]:增益
//输出 results[4+step]:增益带宽（nm）
//输出 results[5+step]:泵浦光中心波长（x轴））*/
export function dllGclCalOPA3ForPumpWaveList(params?: dllGclCalOPA3ForPumpWaveListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/gcl/calOPA3ForPumpWaveList",
    method: "get",
    params,
    ...config
  })
}

/** 4.3.1计算 信号光波长作为变量//输入 materialName：晶体名称
//输入 xp：泵浦光波长，单位为nm
//输入 lc：非线性晶体长度，单位为mm
//输入 Ip：泵浦功率密度，单位为GW/cm²
//输入 deff：有效非线性系数，单位为pm/V
//输入 iCount：计算点数，即需要计算的信号波长个数
//输入 startxs：起始信号光波长，单位为nm
//输入 endxs：结束信号光波长，单位为nm
//输出 results数组，总长度为6*iCount
//输出 results[0+step]:非共线角（度）
//输出 results[1+step]:相位匹配角（度）
//输出 results[2+step]:参量带宽（nm）
//输出 results[3+step]:增益
//输出 results[4+step]:增益带宽（nm）
//输出 results[5+step]:种子光中心波长（x轴）*/
export function dllGclCalOPA3ForSignalwaveList(params?: dllGclCalOPA3ForSignalwaveListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/gcl/calOPA3ForSignalwaveList",
    method: "get",
    params,
    ...config
  })
}

/** 4.2.1计算特定信号光与泵浦光波长时，群速度需要满足的条件，及对应带宽，计算数值// 输入 xs：信号光波长，单位为nm
// 输入 xp：泵浦光波长，单位为nm
// 输入 lc：非线性晶体长度，单位为mm
// 输入 Ip：泵浦功率密度，单位为GW/cm²
// 输入 deff：有效非线性系数，单位为pm/V
// 输入 crystalname：晶体名称
// 输出 result，总长度为8
// 输出 泵浦光波长（nm）
// 输出 信号光波长（nm）
// 输出 空闲光波长（nm）
// 输出 最佳非共线角（度）
// 输出 此时相位匹配角（度）
// 输出 此时参量带宽（nm）
// 输出 此时增益倍数
// 输出 此时增益带宽（nm）*/
export function dllGclCalOPAForAngleRange(params?: dllGclCalOPAForAngleRangeParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/gcl/calOPAForAngleRange",
    method: "get",
    params,
    ...config
  })
}

/** 4.2.2计算 非共线角变化对一些参量的影响//输入 materialName：材料名称，字符串类型
//输入 xs：信号光波长，单位为nm
//输入 xp：泵浦光波长，单位为nm
//输入 lc：非线性晶体长度，单位为mm
//输入 Ip：泵浦功率密度，单位为GW/cm²
//输入 deff：有效非线性系数，单位为pm/V
//输入 iCount：计算点数
//输入 starta：起始非共线角，单位为度
//输入 enda：结束非共线角，单位为度
//输出 results：结果数组指针，用于存储计算结果。数组总长度为5*iCount
//输出 result[0+step] x轴值非共线角（度）
//输出 result[1+step] 相位匹配角（度）
//输出 result[2+step] 参量带宽（nm）
//输出 result[3+step] 增益带宽（nm）
//输出 result[4+step] 增益倍数*/
export function dllGclCalOPAForAngleRangeList(params?: dllGclCalOPAForAngleRangeListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/gcl/calOPAForAngleRangeList",
    method: "get",
    params,
    ...config
  })
}

/** 7.1物理常量*/
export function dllGetPhysicsConstants(config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/getPhysicsConstants",
    method: "get",
    ...config
  })
}

/** 1.2.4 根据激光平均功率，重复频率，计算脉冲能量
  //根据激光平均功率，重复频率，计算脉冲能量
//输入 平均功率 AveragePower:单位W
//输入 重复频率 RepRate:单位kHz
//输出 result[0]脉冲能量:单位uJ*/
export function dllGlmdCalEnergyByPowerRepRate(params?: dllGlmdCalEnergyByPowerRepRateParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/glmd/calEnergyByPowerRepRate",
    method: "get",
    params,
    ...config
  })
}

/** 1.2.5 calFRadiusByRadiusWavelens
  根据激光聚焦前光斑、中心波长、透镜焦距计算聚焦后光斑半径
//输入 光斑半径 Beamradius:单位um
//输入 聚焦透镜焦距 f:单位mm
//输入 波长 wavelength:单位nm
输出 输出 result[0]聚焦后光斑半径:单位um*/
export function dllGlmdCalFRadiusByRadiusWavelens(params?: dllGlmdCalFRadiusByRadiusWavelensParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/glmd/calFRadiusByRadiusWavelens",
    method: "get",
    params,
    ...config
  })
}

/** 1.2.1 calPowerDensityByEnergyPluseWidthRadius
  功能说明 根据激光能量，脉宽，聚焦光斑大小计算峰值功率和峰值功率
密度
输入参数 //输入 能量 Energy：单位 uJ
//输入 脉冲宽度 pulsewidth：单位 fs
//输入 光斑半径 Beamradius：单位 um
输出结果 //输出 result[0] 峰值功率：单位 W
//输出 result[1] 峰值功率密度：单位 GW/cm^2
*/
export function dllGlmdCalPowerDensityByEnergyPluseWidthRadius(params?: dllGlmdCalPowerDensityByEnergyPluseWidthRadiusParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/glmd/calPowerDensityByEnergyPluseWidthRadius",
    method: "get",
    params,
    ...config
  })
}

/** 1.2.2 calPowerDensityByPowerPluseWidthRadius
  功能说明 根据激光平均功率，重复频率，脉宽，聚焦光斑大小计算峰值
功率和峰值功率密度
输入参数 //输入 平均功率 AveragePower：单位 W
//输入 重复频率 RepRate：单位 kHz
//输入 脉冲宽度 pulsewidth：单位 fs
//输入 光斑半径 Beamradius：单位 um
输出结果 //输出 result[0] 峰值功率：单位 W
//输出 result[1] 峰值功率密度：单位 GW/cm^2*/
export function dllGlmdCalPowerDensityByPowerPluseWidthRadius(params?: dllGlmdCalPowerDensityByPowerPluseWidthRadiusParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/glmd/calPowerDensityByPowerPluseWidthRadius",
    method: "get",
    params,
    ...config
  })
}

/** 1.2.3 calPowerDensityByPowerPluseWidthRadiusWaveLen
  功能说明 根据激光平均功率,重复频率，脉宽，聚焦前光斑大小等计算
峰值功率和峰值功率密度
输入参数 //输入 平均功率 AveragePower：单位 W
//输入 重复频率 RepRate：单位 kHz
//输入 脉冲宽度 pulsewidth：单位 fs
//输入 光斑半径 Beamradius：单位 um
//输入 聚焦透镜焦距 f:单位 mm
//输入 波长 wavelength：单位 nm
输出结果 //输出 result[0] 峰值功率：单位 W
//输出 result[1] 峰值功率密度：单位 GW/cm^2*/
export function dllGlmdCalPowerDensityByPowerPluseWidthRadiusWaveLen(params?: dllGlmdCalPowerDensityByPowerPluseWidthRadiusWaveLenParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/glmd/calPowerDensityByPowerPluseWidthRadiusWaveLen",
    method: "get",
    params,
    ...config
  })
}

/** 2.1.2 calFocalLengthsi 计算焦距
输入参数 //输入 objectDistance 物距
//输入 imageDistance 像距
输出结果 //输出：result[0] 计算出的焦距
*/
export function dllGsCalFocalLengthsi(params?: dllGsCalFocalLengthsiParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/gs/calFocalLengthsi",
    method: "get",
    params,
    ...config
  })
}

/** 2.1.1 calImageDistance 计算像距
输入参数 //输入 objectDistance 物距
//输入 focalLength 焦距
输出结果 输出：result[0] 计算出的像距
*/
export function dllGsCalImageDistance(params?: dllGsCalImageDistanceParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/gs/calImageDistance",
    method: "get",
    params,
    ...config
  })
}

/** 4.6.4求 Martinez 展宽器的色散
输入参数 //输入 wave0：激光中心波长，单位为 nm
//输入 wave：计算激光波长，单位为 nm
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为 mm
//输入 l：光栅凹面镜中心距，单位为 mm
//输入 n：展宽程数，程
输出结果 //输出 double* result：结果数组指针，包含以下元素：
//输出 result[0]：一阶色散，单位 fs
//输出 result[1]：二阶色散，单位 fs2
//输出 result[2]：三阶色散，单位 fs3
//输出 result[3]：四阶色散，单位 fs4*/
export function dllMartCalMartinezDispersion(params?: dllMartCalMartinezDispersionParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/mart/calMartinezDispersion",
    method: "get",
    params,
    ...config
  })
}

/** 4.6.1计算已知脉冲宽度求 Martinez 展宽器的色散
//输入 pulsewidth：激光脉冲宽度，单位为 fs
//输入 wave0：激光中心波长，单位为 nm
//输入 wave：计算激光波长，单位为 nm
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为 mm
//输入 l：光栅凹面镜中心距，单位为 mm
//输入 n：展宽程数，程
输出结果 //输出 result 数组长度为 7
//输出 result[0]：一阶色散，单位 fs
//输出 result[1]：二阶色散，单位 fs2
//输出 result[2]：三阶色散，单位 fs3
//输出 result[3]：四阶色散，单位 fs4
//输出 result[4]：FT 谱宽，单位 nm
//输出 result[5]：出射脉宽，单位 ps
31
//输出 result[6]：展宽倍数，无单位
*/
export function dllMartCalMartinezDispersionByPulseWidth(params?: dllMartCalMartinezDispersionByPulseWidthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/mart/calMartinezDispersionByPulseWidth",
    method: "get",
    params,
    ...config
  })
}

/** 4.6.2计算已知光谱宽度求 Martinez 展宽器的色散
//输入 bandwidth：激光光谱宽度，单位为 nm
//输入 wave0：激光中心波长，单位为 nm
//输入 wave：计算激光波长，单位为 nm
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为 mm
//输入 l：光栅凹面镜中心距，单位为 mm
//输入 n：展宽程数，程
输出结果 //输出 result 数组长度为 7
//输出 result[0]：一阶色散，单位 fs
//输出 result[1]：二阶色散，单位 fs2
//输出 result[2]：三阶色散，单位 fs3
//输出 result[3]：四阶色散，单位 fs4
//输出 result[4]：FT 谱宽，单位 nm
//输出 result[5]：出射脉宽，单位 ps
//输出 result[6]：展宽倍数，无单位
*/
export function dllMartCalMartinezDispersionBySpectrum(params?: dllMartCalMartinezDispersionBySpectrumParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/mart/calMartinezDispersionBySpectrum",
    method: "get",
    params,
    ...config
  })
}

/** 4.6.3计算已知光谱宽度和脉冲宽度求 Martinez 展宽器的色散
输入参数 //输入 spectrumwidth：激光光谱宽度，单位为 nm
//输入 pulsewidth1：激光脉冲宽度，单位为 fs
//输入 wave0：激光中心波长，单位为 nm
//输入 wave：计算激光波长，单位为 nm
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为 mm
//输入 l：光栅凹面镜中心距，单位为 mm
//输入 n：展宽程数，程
输出结果 //输出 double* result：结果数组指针，包含以下元素：
//输出 result[0]：一阶色散，单位 fs
//输出 result[1]：二阶色散，单位 fs2
//输出 result[2]：三阶色散，单位 fs3
//输出 result[3]：四阶色散，单位 fs4
//输出 result[4]：入射啁啾，无单位
//输出 result[5]：出射啁啾，无单位
//输出 result[6]：出射脉宽，单位 ps
//输出 result[7]：展宽倍数，无单位*/
export function dllMartCalMartinezDispersionBySpectrumAndPulseWidth(params: dllMartCalMartinezDispersionBySpectrumAndPulseWidthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/mart/calMartinezDispersionBySpectrumAndPulseWidth",
    method: "get",
    params,
    ...config
  })
}

/** 4.6.8计算 Martinez 型展宽器不同光栅刻线密度的色散
输入参数 //输入 wave0：激光中心波长，单位为纳米
//输入 wave：起始激光波长，单位为纳米
//输入 gama：光栅入射角，单位为度
//输入 startD：光栅刻线密度，单位为线/mm
//输入 endD：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为 mm
//输入 l：光栅凹面镜中心距，单位为 mm
//输入 n：展宽程数，程
//输入 iCount：要计算的波长点的数量
输出结果 //输出 result：指向结果数组的指针，用于存储每个波长点的色散
数据
//输出 reult[0+step]:x 轴值波长（nm）
//输出 reult[1+step]:GDD（*10-6fs2/mm）
//输出 reult[2+step]:TOD（*10-6fs2/mm）
//输出 reult[3+step]:FOD（*10-6fs2/mm）
*/
export function dllMartCalMartinezDispersionListByD(params: dllMartCalMartinezDispersionListByDParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/mart/calMartinezDispersionListByD",
    method: "get",
    params,
    ...config
  })
}

/** 4.6.9计算 Martinez 型展宽器不同光栅入射角的色散
输入参数 //输入 wave0：激光中心波长，单位为纳米
//输入 wave：起始激光波长，单位为纳米
//输入 startGama：光栅入射角，单位为度
//输入 endGama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为 mm
//输入 l：光栅凹面镜中心距，单位为 mm
//输入 n：展宽程数，程
//输入 iCount：要计算的波长点的数量
输出结果 //输出 result：指向结果数组的指针，用于存储每个波长点的色散
数据
//输出 reult[0+step]:x 轴值波长（nm）
//输出 reult[1+step]:GDD（*10-6fs2/mm）
//输出 reult[2+step]:TOD（*10-6fs2/mm）
//输出 reult[3+step]:FOD（*10-6fs2/mm）
*/
export function dllMartCalMartinezDispersionListByGama(params: dllMartCalMartinezDispersionListByGamaParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/mart/calMartinezDispersionListByGama",
    method: "get",
    params,
    ...config
  })
}

/** 4.6.7计算 Martinez 型展宽器不同凹面镜中心距的色散
输入参数 //输入 wave0：激光中心波长，单位为纳米
//输入 wave：起始激光波长，单位为纳米
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为 mm
//输入 startL：光栅凹面镜中心距，单位为 mm
//输入 endL：光栅凹面镜中心距，单位为 mm
//输入 n：展宽程数，程
//输入 iCount：要计算的波长点的数量
输出结果 //输出 result：指向结果数组的指针，用于存储每个波长点的色散
数据
//输出 reult[0+step]:x 轴值波长（nm）
//输出 reult[1+step]:GDD（*10-6fs2/mm）
//输出 reult[2+step]:TOD（*10-6fs2/mm）
//输出 reult[3+step]:FOD（*10-6fs2/mm）*/
export function dllMartCalMartinezDispersionListByL(params: dllMartCalMartinezDispersionListByLParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/mart/calMartinezDispersionListByL",
    method: "get",
    params,
    ...config
  })
}

/** 4.6.6计算 Martinez 型展宽器不同曲率半径的色散
输入参数 //输入 wave0：激光中心波长，单位为纳米
//输入 wave：起始激光波长，单位为纳米
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 startR：凹面镜曲率半径，单位为 mm
//输入 endR：凹面镜曲率半径，单位为 mm
//输入 l：光栅凹面镜中心距，单位为 mm
//输入 n：展宽程数，程
//输入 iCount：要计算的波长点的数量
输出结果 //输出 result：指向结果数组的指针，用于存储每个波长点的色散
数据
//输出 reult[0+step]:x 轴值波长（nm）
//输出 reult[1+step]:GDD（*10-6fs2/mm）
//输出 reult[2+step]:TOD（*10-6fs2/mm）
//输出 reult[3+step]:FOD（*10-6fs2/mm）
*/
export function dllMartCalMartinezDispersionListByR(params: dllMartCalMartinezDispersionListByRParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/mart/calMartinezDispersionListByR",
    method: "get",
    params,
    ...config
  })
}

/** 4.6.5计算 Martinez 型展宽器不同追迹波长的色散
输入参数 //输入 wave0：激光中心波长，单位为纳米
//输入 startWave：起始激光波长，单位为纳米
//输入 endWave：结束激光波长，单位为纳米
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为 mm
//输入 l：光栅凹面镜中心距，单位为 mm
//输入 n：展宽程数，程
//输入 iCount：要计算的波长点的数量
输出结果 //输出 result：指向结果数组的指针，用于存储每个波长点的色散
数据
//输出 reult[0+step]:x 轴值波长（nm）
//输出 reult[1+step]:GDD（*10-6fs2/mm）
//输出 reult[2+step]:TOD（*10-6fs2/mm）
//输出 reult[3+step]:FOD（*10-6fs2/mm）
*/
export function dllMartCalMartinezDispersionListByWave(params: dllMartCalMartinezDispersionListByWaveParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/mart/calMartinezDispersionListByWave",
    method: "get",
    params,
    ...config
  })
}

/** 4.4.4求Offner展宽器的色散//输入 wave0：激光中心波长，单位为nm
//输入 wave：计算激光波长，单位为nm
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为mm
//输入 l：光栅凹面镜中心距，单位为mm
//输入 n：展宽程数，程
//输出 result数组长度为4
//输出 result[0]：一阶色散，单位fs
//输出 result[1]：二阶色散，单位fs2
//输出 result[2]：三阶色散，单位fs3
//输出 result[3]：四阶色散，单位fs4*/
export function dllOffnerCalOffnerDispersion(params?: dllOffnerCalOffnerDispersionParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/offner/calOffnerDispersion",
    method: "get",
    params,
    ...config
  })
}

/** 4.4.1已知脉冲宽度求Offner展宽器的色散//输入 pulsewidth：激光脉冲宽度，单位为fs
//输入 wave0：激光中心波长，单位为nm
//输入 wave：计算激光波长，单位为nm
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为mm
//输入 l：光栅凹面镜中心距，单位为mm
//输入 n：展宽程数，程
//输出 result数组长度为7
//输出 result[0]：一阶色散，单位fs
//输出 result[1]：二阶色散，单位fs2
//输出 result[2]：三阶色散，单位fs3
//输出 result[3]：四阶色散，单位fs4
//输出 result[4]：FT谱宽，单位nm
//输出 result[5]：出射脉宽，单位ps
//输出 result[6]：展宽倍数，无单位*/
export function dllOffnerCalOffnerDispersionByPulseWidth(params?: dllOffnerCalOffnerDispersionByPulseWidthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/offner/calOffnerDispersionByPulseWidth",
    method: "get",
    params,
    ...config
  })
}

/** 4.4.2已知光谱宽度求Offner展宽器的色散//输入 bandwidth：激光光谱宽度，单位为nm
//输入 wave0：激光中心波长，单位为nm
//输入 wave：计算激光波长，单位为nm
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为mm
//输入 l：光栅凹面镜中心距，单位为mm
//输入 n：展宽程数，程
//输出 result数组长度为7
//输出 result[0]：一阶色散，单位fs
//输出 result[1]：二阶色散，单位fs2
//输出 result[2]：三阶色散，单位fs3
//输出 result[3]：四阶色散，单位fs4
//输出 result[4]：FT谱宽，单位nm
//输出 result[5]：出射脉宽，单位ps
//输出 result[6]：展宽倍数，无单位*/
export function dllOffnerCalOffnerDispersionBySpectrum(params?: dllOffnerCalOffnerDispersionBySpectrumParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/offner/calOffnerDispersionBySpectrum",
    method: "get",
    params,
    ...config
  })
}

/** 4.4.3已知光谱宽度和脉冲宽度求Offner展宽器的色散//输入 spectrumwidth：激光光谱宽度，单位为nm
//输入 pulsewidth1：激光脉冲宽度，单位为fs
//输入 wave0：激光中心波长，单位为nm
//输入 wave：计算激光波长，单位为nm
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为mm
//输入 l：光栅凹面镜中心距，单位为mm
//输入 n：展宽程数，程
//输出 result数组长度为8
//输出 result[0]：一阶色散，单位fs
//输出 result[1]：二阶色散，单位fs2
//输出 result[2]：三阶色散，单位fs3
//输出 result[3]：四阶色散，单位fs4
//输出 result[4]：入射啁啾，无单位
//输出 result[5]：出射啁啾，无单位
//输出 result[6]：出射脉宽，单位ps
//输出 result[7]：展宽倍数，无单位*/
export function dllOffnerCalOffnerDispersionBySpectrumAndPulseWidth(params?: dllOffnerCalOffnerDispersionBySpectrumAndPulseWidthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/offner/calOffnerDispersionBySpectrumAndPulseWidth",
    method: "get",
    params,
    ...config
  })
}

/** 4.4.8计算Offner型展宽器不同光栅刻线密度的色散//输入 wave0：激光中心波长，单位为纳米
//输入 wave：起始激光波长，单位为纳米
//输入 gama：光栅入射角，单位为度
//输入 startD：光栅刻线密度，单位为线/mm
//输入 endD：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为mm
//输入 l：光栅凹面镜中心距，单位为mm
//输入 n：展宽程数，程
//输入 iCount：要计算的波长点的数量
//输出 result：指向结果数组的指针，用于存储每个波长点的色散数据
//输出 reult[0+step]:x轴值波长（nm）
//输出 reult[1+step]:GDD（*10-6fs2/mm）
//输出 reult[2+step]:TOD（*10-6fs2/mm）
//输出 reult[3+step]:FOD（*10-6fs2/mm）*/
export function dllOffnerCalOffnerDispersionListByD(params?: dllOffnerCalOffnerDispersionListByDParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/offner/calOffnerDispersionListByD",
    method: "get",
    params,
    ...config
  })
}

/** 4.4.9计算Offner型展宽器不同光栅入射角的色散//输入 wave0：激光中心波长，单位为纳米
//输入 wave：起始激光波长，单位为纳米
//输入 startGama：光栅入射角，单位为度
//输入 endGama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为mm
//输入 l：光栅凹面镜中心距，单位为mm
//输入 n：展宽程数，程
//输入 iCount：要计算的波长点的数量
//输出 result：指向结果数组的指针，用于存储每个波长点的色散数据
//输出 reult[0+step]:x轴值波长（nm）
//输出 reult[1+step]:GDD（*10-6fs2/mm）
//输出 reult[2+step]:TOD（*10-6fs2/mm）
//输出 reult[3+step]:FOD（*10-6fs2/mm）*/
export function dllOffnerCalOffnerDispersionListByGama(params?: dllOffnerCalOffnerDispersionListByGamaParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/offner/calOffnerDispersionListByGama",
    method: "get",
    params,
    ...config
  })
}

/** 4.4.7计算Offner型展宽器不同凹面镜中心距的色散//输入 wave0：激光中心波长，单位为纳米
//输入 wave：起始激光波长，单位为纳米
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为mm
//输入 startL：光栅凹面镜中心距，单位为mm
//输入 endL：光栅凹面镜中心距，单位为mm
//输入 n：展宽程数，程
//输入 iCount：要计算的波长点的数量
//输出 result：指向结果数组的指针，用于存储每个波长点的色散数据
//输出 reult[0+step]:x轴值波长（nm）
//输出 reult[1+step]:GDD（*10-6fs2/mm）
//输出 reult[2+step]:TOD（*10-6fs2/mm）
//输出 reult[3+step]:FOD（*10-6fs2/mm）*/
export function dllOffnerCalOffnerDispersionListByL(params?: dllOffnerCalOffnerDispersionListByLParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/offner/calOffnerDispersionListByL",
    method: "get",
    params,
    ...config
  })
}

/** 4.4.6计算Offner型展宽器不同曲率半径的色散//输入 wave0：激光中心波长，单位为纳米
//输入 wave：起始激光波长，单位为纳米
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 startR：凹面镜曲率半径，单位为mm
//输入 endR：凹面镜曲率半径，单位为mm
//输入 l：光栅凹面镜中心距，单位为mm
//输入 n：展宽程数，程
//输入 iCount：要计算的波长点的数量
//输出 result：指向结果数组的指针，用于存储每个波长点的色散数据
//输出 reult[0+step]:x轴值波长（nm）
//输出 reult[1+step]:GDD（*10-6fs2/mm）
//输出 reult[2+step]:TOD（*10-6fs2/mm）
//输出 reult[3+step]:FOD（*10-6fs2/mm）*/
export function dllOffnerCalOffnerDispersionListByR(params?: dllOffnerCalOffnerDispersionListByRParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/offner/calOffnerDispersionListByR",
    method: "get",
    params,
    ...config
  })
}

/** 4.4.5计算Offner型展宽器不同追迹波长的色散//输入 wave0：激光中心波长，单位为纳米
//输入 startWave：起始激光波长，单位为纳米
//输入 endWave：结束激光波长，单位为纳米
//输入 gama：光栅入射角，单位为度
//输入 d：光栅刻线密度，单位为线/mm
//输入 r：凹面镜曲率半径，单位为mm
//输入 l：光栅凹面镜中心距，单位为mm
//输入 n：展宽程数，程
//输入 iCount：要计算的波长点的数量
//输出 result：指向结果数组的指针，用于存储每个波长点的色散数据
//输出 reult[0+step]:x轴值波长（nm）
//输出 reult[1+step]:GDD（*10-6fs2/mm）
//输出 reult[2+step]:TOD（*10-6fs2/mm）
//输出 reult[3+step]:FOD（*10-6fs2/mm）*/
export function dllOffnerCalOffnerDispersionListByWave(params?: dllOffnerCalOffnerDispersionListByWaveParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/offner/calOffnerDispersionListByWave",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统-等效光栅对3*/
export function dllPerformCalculation(params?: dllPerformCalculationParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/performCalculation",
    method: "get",
    params,
    ...config
  })
}

/** 二.系统-等效光栅对1*/
export function dllPerformCalculations(params?: dllPerformCalculationsParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/performCalculations",
    method: "get",
    params,
    ...config
  })
}

/** 1.4.2 calLaserL 计算激光腔长 L
输入参数 输入 RP :脉冲重复频率/纵横间隔，单位为（Hz）
输出结果 输出：result[0] 谐振腔腔长（晶体折射率忽略），单位为米（m）
*/
export function dllQccpCalLaserL(params?: dllQccpCalLaserLParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/qccp/calLaserL",
    method: "get",
    params,
    ...config
  })
}

/** 1.4.1 calLaserRP 计算激光脉冲重频频率 RP
输入参数 //输入 L:谐振腔腔长（晶体折射率忽略），单位为米（m）
输出结果 输出：result[0] 脉冲重复频率/纵横间隔，单位为（Hz）
*/
export function dllQccpCalLaserRP(params?: dllQccpCalLaserRPParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/qccp/calLaserRP",
    method: "get",
    params,
    ...config
  })
}

/** 4.5.1 计算四镜腔型的谐振腔水平向腰斑尺寸  输出数组长度未知
////输入 L1：第一段长度，单位为 mm
//输入 L2：第二段长度，单位为 mm
//输入 L3：第三段长度，单位为 mm
//输入 L4：第四段长度，单位为 mm
//输入 D：晶体长度，单位为 mm
//输入 lamda：激光波长，单位为 nm
//输入 r1：M1 镜半径，单位为 mm
//输入 r2：M2 镜半径，单位为 mm
//输入 n：晶体的折射率
//输入 theta1：M1 镜倾斜角度
//输入 theta2：M2 镜倾斜角度
//输入 interval：计算间隔，步长
输出结果 //输出 double* result：结果数组的指针（数组长度为返回值），用
于存储计算结果
//输出 该数组存储了每个计算点的 x（长度，单位为 mm）和 y
（水平面腰斑尺寸，单位为微米）值*/
export function dllSjCalCavityByFourMirrorsHor(params?: dllSjCalCavityByFourMirrorsHorParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/sj/calCavityByFourMirrorsHor",
    method: "get",
    params,
    ...config
  })
}

/** 4.5.2计算四镜腔型的谐振腔垂向腰斑尺寸  输出长度未知
//输入 L1：第一段长度，单位为 mm
//输入 L2：第二段长度，单位为 mm
//输入 L3：第三段长度，单位为 mm
//输入 L4：第四段长度，单位为 mm
//输入 D：晶体长度，单位为 mm
//输入 lamda：激光波长，单位为 nm
//输入 r1：M1 镜半径，单位为 mm
//输入 r2：M2 镜半径，单位为 mm
//输入 n：晶体的折射率
//输入 theta1：M1 镜倾斜角度
//输入 theta2：M2 镜倾斜角度
//输入 interval：计算间隔，步长
输出结果 //输出 double* result：结果数组的指针，用于存储计算结果
//输出 该数组存储了每个计算点的 x（长度，单位为 mm）和 y
（竖直面腰斑尺寸，单位为微米）值
*/
export function dllSjCalCavityByFourMirrorsVer(params?: dllSjCalCavityByFourMirrorsVerParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/sj/calCavityByFourMirrorsVer",
    method: "get",
    params,
    ...config
  })
}

/** 1.3.3 calChirpMT  根据激光中心波长、光谱宽度，脉冲宽度，求时间带宽积
输入参数 //输入 double w0：激光中心波长，单位为 nm
//输入 doube spectrumwidth：光谱宽度，单位为 nm
//输入 double pulsewidth：脉冲宽度，单位为 fs
输出结果 //输出 result[0] 啁啾量，无单位
//输出 result[1] 时间带宽积，无单位
*/
export function dllSjdgCalChirpMT(params?: dllSjdgCalChirpMTParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/sjdg/calChirpMT",
    method: "get",
    params,
    ...config
  })
}

/** 1.3.2 calLaserPluseWidth
  功能说明 根据激光中心波长和光谱宽度，求激光脉宽
输入参数 //输入 double w0：激光中心波长，单位为 nm
//输入 double bandwidth：光谱宽度，单位为 nm
输出结果 //输出 result[0] 激光脉宽，单位：fs*/
export function dllSjdgCalLaserPluseWidth(params?: dllSjdgCalLaserPluseWidthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/sjdg/calLaserPluseWidth",
    method: "get",
    params,
    ...config
  })
}

/** 1.3.1 calLaserSpectrumWidth
  功能说明 根据激光中心波长和脉冲宽度，求激光谱宽
输入参数 //输入 double w0：激光中心波长，单位为 nm
//输入 double pulse：脉冲宽度，单位为 fs
输出结果 输出 result[0] 激光谱宽，单位：nm*/
export function dllSjdgCalLaserSpectrumWidth(params?: dllSjdgCalLaserSpectrumWidthParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/sjdg/calLaserSpectrumWidth",
    method: "get",
    params,
    ...config
  })
}

/** 3.3.1计算三片透射光谱输出//输入 double A1：角度A1 起始入射角（度）。
//输入 double A3：角度A3 结束入射角（度）。
//输入 double d：石英晶体厚度 单位mm。
//输入 double R2：第2片厚度是第1片的倍数。
//输入 double R3：第3片厚度是第1片的倍数。
//输入 double alpha：晶轴与表面的夹角alpha，单位为度。
//输入 double startWave：起始波长，单位nm。
//输入 double endWave：结束波长，单位nm。
//输入 int iCount：要计算的数据点数量。
//输出 double* result：指向结果数组的指针，用于存储计算结果，数组总长度为3*iCount
//输出 result[0+3*index]:起始入射角的透射率数组
//输出 result[1+3*index]:结束入射角的透射率数组
//输出 result[2+3*index]:横坐标数组 波长：nm*/
export function dllSzsCalBirefringenceSpectrumList(params?: dllSzsCalBirefringenceSpectrumListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/szs/calBirefringenceSpectrumList",
    method: "get",
    params,
    ...config
  })
}

/** 3.3.2计算单片透射光谱输出//输入 double A1：角度A1 起始入射角（度）。
//输入 double A3：角度A3 结束入射角（度）。
//输入 double d：石英晶体厚度 单位mm。
//输入 double alpha：晶轴与表面的夹角alpha，单位为度。
//输入 double startWave：起始波长，单位nm。
//输入 double endWave：结束波长，单位nm。
//输入 int iCount：要计算的数据点数量。
//输出 double* result：指向结果数组的指针，用于存储计算结果，数组总长度为3*iCount
//输出 result[0+3*index]:起始入射角的透射率数组
//输出 result[1+3*index]:结束入射角的透射率数组
//输出 result[2+3*index]:横坐标数组 波长：nm*/
export function dllSzsCalBirefringenceSpectrumSingleList(params?: dllSzsCalBirefringenceSpectrumSingleListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/szs/calBirefringenceSpectrumSingleList",
    method: "get",
    params,
    ...config
  })
}

/** 4.1.1信号光波长为变量，固定非共线角和晶体相位匹配角，计算相关参量//输入 materialName：材料名称
//输入 xp：泵浦光波长，单位为nm
//输入 a：内部非共线角，单位为度
//输入 p：相位匹配角，单位为度
//输入 lc：晶体长度，单位为mm
//输入 Ip：泵浦功率密度，单位为GW/cm²
//输入 deff：有效非线性系数，单位为pm/V
//输入 iCount：计算点数，即需要计算的信号波长个数
//输入 startxs：起始信号波长，单位为nm
//输入 endxs：结束信号波长，单位为nm
//输出 results 总点数为iCount*8
//输出 results[0+step]:闲频光散射角(度)
//输出 results[1+step]:相位匹配角(度)
//输出 results[2+step]:增益/倍数(复数的为实数部分值)
//输出 results[3+step]:参量带宽（nm）
//输出 results[4+step]:增益带宽（nm）
//输出 results[5+step]:闲频光波长(um)
//输出 results[6+step]:相位失配（mm^-1）
//输出 results[7+step]:x轴值种子光波长（nm）*/
export function dllUnitsysCalOPA1ForSignalWaveList(params?: dllUnitsysCalOPA1ForSignalWaveListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/dll/unitsys/calOPA1ForSignalWaveList",
    method: "get",
    params,
    ...config
  })
}
