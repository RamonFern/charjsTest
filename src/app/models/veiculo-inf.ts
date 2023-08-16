export interface Dados {
  placa: string
}

export interface DadosVeiculo {
  error: boolean
  message: string
  response: Response
  api_limit: number
  api_limit_for: string
  api_limit_used: number
}

export interface Response {
  MARCA: string
  MODELO: string
  SUBMODELO: string
  VERSAO: string
  ano: string
  anoModelo: string
  chassi: string
  codigoRetorno: string
  codigoSituacao: string
  cor: string
  data: string
  dataAtualizacaoAlarme: string
  dataAtualizacaoCaracteristicasVeiculo: string
  dataAtualizacaoRouboFurto: string
  extra: Extra
  fipe: Fipe
  listamodelo: string[]
  logo: string
  marca: string
  mensagemRetorno: string
  message: string
  modelo: string
  municipio: string
  origem: string
  placa: string
  placa_alternativa: string
  situacao: string
  uf: string
}

export interface Extra {
  ano_fabricacao: string
  ano_modelo: string
  caixa_cambio: string
  cap_maxima_tracao: string
  capacidade_carga: string
  carroceria: string
  chassi: string
  cilindradas: string
  combustivel: Combustivel
  cor_veiculo: CorVeiculo
  data_atualiacao: string
  di: string
  eixo_traseiro_dif: string
  eixos: string
  especie_veiculo: string
  faturado: string
  id: string
  ident_importadora: string
  limite_restricao_trib: string
  linha: string
  marca_modelo: MarcaModelo
  motor: string
  municipio: Municipio
  nacionalidade: Nacionalidade
  peso_bruto_total: string
  placa: string
  placa_modelo_antigo: string
  placa_modelo_novo: string
  placa_nova: string
  potencia: string
  quantidade_passageiro: string
  registro_di: string
  renavam: any
  restricao_1: Restricao1
  restricao_2: Restricao2
  restricao_3: Restricao3
  restricao_4: Restricao4
  situacao_chassi: string
  situacao_veiculo: string
  terceiro_eixo: string
  tipo_carroceria: TipoCarroceria
  tipo_cilindrada: string
  tipo_doc_faturado: TipoDocFaturado
  tipo_doc_importadora: string
  tipo_doc_prop: TipoDocProp
  tipo_montagem: string
  tipo_potencia: string
  tipo_veiculo: TipoVeiculo
  uf_faturado: string
  uf_placa: string
  ultima_atualizacao: string
  unidade_local_srf: string
}

export interface Combustivel {
  combustivel: string
}

export interface CorVeiculo {
  cor: string
}

export interface MarcaModelo {
  grupo: string
  marca: string
  modelo: string
  segmento: string
  sub_segmento: string
  version: any
}

export interface Municipio {
  municipio: string
  uf: string
}

export interface Nacionalidade {
  nacionalidade: string
}

export interface Restricao1 {
  id: number
  restricao: string
}

export interface Restricao2 {
  id: number
  restricao: string
}

export interface Restricao3 {
  id: number
  restricao: string
}

export interface Restricao4 {
  id: number
  restricao: string
}

export interface TipoCarroceria {
  carroceria: string
}

export interface TipoDocFaturado {
  tipo_pessoa: string
}

export interface TipoDocProp {
  tipo_pessoa: string
}

export interface TipoVeiculo {
  tipo_veiculo: string
}

export interface Fipe {
  dados: Dado[]
}

export interface Dado {
  ano_modelo: string
  codigo_fipe: string
  codigo_marca: number
  codigo_modelo: string
  combustivel: string
  id_valor: number
  mes_referencia: string
  referencia_fipe: number
  score: number
  sigla_combustivel: string
  texto_marca: string
  texto_modelo: string
  texto_valor: string
  tipo_modelo: number
}

export interface DadoResumido {
  placa: string
  marca: string
  modelo: string
  cor: string
  ano: string
  anoModelo: string
  situacao: string
  uf: string
}



