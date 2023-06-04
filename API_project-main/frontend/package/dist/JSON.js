const json = {
  "Functions": [],
  "InternalFunctions": [],
  "Refset": [],
  "TaskEditable": ["All"],
  "TaskInReport": ["All"],
  "TaskVisible": ["All"],
  "archetypeId": "openEHR-EHR-COMPOSITION.administrativo.v0",
  "itemName": "Instituição",
  "itemPath": "",
  "items": [[{
    "Functions": [],
    "InternalFunctions": [],
    "Refset": [],
    "TaskEditable": ["All"],
    "TaskInReport": ["All"],
    "TaskVisible": ["All"],
    "archetype_id": "openEHR-EHR-ADMIN_ENTRY.organizacion.v0",
    "data_type": "Title",
    "itemName": "Organização",
    "itemPath": "items.0.0",
    "items": [{
      "Functions": [],
      "InternalFunctions": [],
      "Refset": [],
      "TaskEditable": ["All"],
      "TaskInReport": ["All"],
      "TaskVisible": ["All"],
      "archetype_id": "openEHR-EHR-CLUSTER.organisation_cc.v0",
      "cardinality": {
        "interval": {
          "lowerOccurrences": 1,
          "upperOccurrences": "*"
        },
        "ordered": false,
        "unique": false
      },
      "data_type": "Title",
      "itemName": "Organização",
      "itemPath": "items.0.0.items.0",
      "items": [{
        "Functions": [],
        "InternalFunctions": [],
        "Refset": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "archetype_id": "openEHR-EHR-CLUSTER.identifier_cc.v0",
        "cardinality": {
          "interval": {
            "lowerOccurrences": 1,
            "upperOccurrences": "*"
          },
          "ordered": false,
          "unique": false
        },
        "data_type": "Title",
        "itemName": "Identificador",
        "itemPath": "items.0.0.items.0.items.0",
        "items": [{
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "constraints": [{
            "default_dataType": "DV_IDENTIFIER",
            "field": "items[at0001]",
            "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.identifier_cc.v0]/[at0001]",
            "rm_attribute_name": "value"
          }],
          "dataType": "DV_IDENTIFIER",
          "itemName": "ID",
          "itemPath": "items.0.0.items.0.items.0.items.0",
          "node": {
            "code": "at0001",
            "description": "O valor do identificador",
            "text": "ID"
          },
          "occurrences": {
            "lowerOccurrences": 1,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.identifier_cc.v0]/[at0001]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": 21425
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_CODED_TEXT",
          "itemName": "Utilização",
          "itemPath": "items.0.0.items.0.items.0.items.1",
          "itemsList": [{
            "code": "at0003",
            "description": "Identificador Habitual",
            "text": "Identificador habitual"
          }, {
            "code": "at0004",
            "description": "Identificador oficial",
            "text": "Oficial"
          }, {
            "code": "at0005",
            "description": "Identificador temporário",
            "text": "Temporário"
          }, {
            "code": "at0006",
            "description": "Identificador secundário",
            "text": "Secundário"
          }],
          "node": {
            "code": "at0002",
            "description": "Objetivo do idenitficador",
            "text": "Utilização"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.identifier_cc.v0]/[at0002]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "terminology_id": "local",
          "value": {
            "code": "at0004",
            "description": "Identificador oficial",
            "text": "Oficial"
          }
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_DATE_TIME",
          "itemName": "Iníco",
          "itemPath": "items.0.0.items.0.items.0.items.2",
          "node": {
            "code": "at0007",
            "description": "Início do período de vigência. O limite é inclusivo",
            "text": "Iníco"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.identifier_cc.v0]/[at0007]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": {
            "date": "2020-06-25",
            "time": "10:10"
          }
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_DATE_TIME",
          "itemName": "Fim",
          "itemPath": "items.0.0.items.0.items.0.items.3",
          "node": {
            "code": "at0008",
            "description": "Fim do período de vigência. Se este dado é omisso , significa que o período mantêm-se em vigência O início pode ser no passado e o fim no futuro o que significa que o período de vigência é esperado terminar nesse momento",
            "text": "Fim"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.identifier_cc.v0]/[at0008]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": {
            "date": null,
            "time": null
          }
        }],
        "node": {
          "code": "at0000",
          "description": "Detalhes do identificador alinha com os recursos do FHIR",
          "text": "Identificador"
        },
        "occurrences": {
          "lowerOccurrences": 1,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.identifier_cc.v0]",
        "ruleMandatory": [],
        "ruleVisibility": []
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "Refset": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "dataType": "DV_BOOLEAN",
        "itemName": "Activa",
        "itemPath": "items.0.0.items.0.items.1",
        "node": {
          "code": "at0010",
          "description": "Se o registo da organização ainda está em ativo.",
          "text": "Activa"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[at0010]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "value": "Sim"
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "Refset": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "dataType": "DV_TEXT",
        "itemName": "Tipo",
        "itemPath": "items.0.0.items.0.items.2",
        "node": {
          "code": "at0011",
          "description": "O tipo de organização que é.",
          "text": "Tipo"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": "*"
        },
        "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[at0011]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "value": null
      }, {
        "Functions": [],
        "InternalFunctions": [{
          "affectedFields": {
            "items.0.0.items.0.items.0.items.0": {
              "body": {
                "page": 0,
                "props": [{
                  "COD": "items.0.0.items.0.items.3"
                }]
              },
              "codeColumn": null,
              "datatype": "DV_IDENTIFIER",
              "dependencies": [{
                "columnRef": "COD",
                "field": {
                  "datatype": "DV_CODED_TEXT",
                  "name": "Organização - Nome",
                  "path": "items.0.0.items.0.items.3",
                  "upperOccurrences": 1
                }
              }],
              "method": "post",
              "name": "Identificador - ID",
              "path": "items.0.0.items.0.items.0.items.0",
              "refsetId": "321",
              "refsetName": "Organizações CHUP",
              "resColumn": "COD",
              "serviceName": "refsetConceptsPaginated?id=321",
              "textColumn": null,
              "upperOccurrences": 1,
              "url": "http://172.21.220.49:4010/"
            }
          },
          "type": "Preenchimento automático de campos"
        }],
        "Refset": ["http://172.21.220.49:4010/refsetConcepts?id=321&code=COD&text=DESIGNACAO"],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "dataType": "DV_CODED_TEXT",
        "itemName": "Nome",
        "itemPath": "items.0.0.items.0.items.3",
        "itemsList": [],
        "node": {
          "code": "at0012",
          "description": "Nome associado à organização.",
          "text": "Nome"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[at0012]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "terminology_id": "external",
        "value": {
          "code": "21425",
          "text": "CE APOIO LUTO INTEGRADO CHP"
        }
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "Refset": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "dataType": "DV_TEXT",
        "itemName": "Outras designações",
        "itemPath": "items.0.0.items.0.items.4",
        "node": {
          "code": "at0013",
          "description": "Uma lista de nomes alternativos pelos quais a organização é conhecida ou era conhecida no passado.",
          "text": "Outras designações"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": "*"
        },
        "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[at0013]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "value": null
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "Refset": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "archetype_id": "openEHR-EHR-CLUSTER.telecom_details.v0",
        "cardinality": {
          "interval": {
            "lowerOccurrences": 1,
            "upperOccurrences": "*"
          },
          "ordered": false,
          "unique": false
        },
        "data_type": "Title",
        "itemName": "Detalhes do contacto",
        "itemPath": "items.0.0.items.0.items.5",
        "items": [{
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_CODED_TEXT",
          "itemName": "Modo",
          "itemPath": "items.0.0.items.0.items.5.items.0",
          "itemsList": [{
            "code": "at0011",
            "description": "Detalhes do contacto telefónico residencial",
            "text": "Casa"
          }, {
            "code": "at0012",
            "description": "Detalhes do contacto telefónico profissional",
            "text": "Profissional"
          }, {
            "code": "at0018",
            "description": "Contacto",
            "text": "Contacto"
          }],
          "node": {
            "code": "at0010",
            "description": "Um qualificador para um contacto telefónico descrevendo o contexto",
            "text": "Modo"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": "*"
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]/[at0010]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "terminology_id": "local",
          "value": [{
            "code": "at0012",
            "description": "Detalhes do contacto telefónico profissional",
            "text": "Profissional"
          }, {
            "code": "at0018",
            "description": "Contacto",
            "text": "Contacto"
          }]
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "cardinality": {
            "interval": {
              "lowerOccurrences": 1,
              "upperOccurrences": "*"
            },
            "ordered": false,
            "unique": false
          },
          "data_type": "Title",
          "itemName": "Contactos",
          "itemPath": "items.0.0.items.0.items.5.items.1",
          "items": [{
            "Functions": [],
            "InternalFunctions": [],
            "Refset": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "dataType": "DV_CODED_TEXT",
            "itemName": "Tipo de contacto telefónico",
            "itemPath": "items.0.0.items.0.items.5.items.1.items.0",
            "itemsList": [{
              "code": "at0013",
              "description": "Detalhes do número de telefone",
              "text": "Telefone"
            }, {
              "code": "at0014",
              "description": "Detalhe do número do fax",
              "text": "Fax"
            }, {
              "code": "at0015",
              "description": "Detalhe do número do telemóvel",
              "text": "Telemóvel"
            }, {
              "code": "at0016",
              "description": "Detalhes do número do pager",
              "text": "Pager"
            }],
            "node": {
              "code": "at0004",
              "description": "Tipo de contacto telefónico",
              "text": "Tipo de contacto telefónico"
            },
            "occurrences": {
              "lowerOccurrences": 1,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]/[at0001]/[at0004]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "terminology_id": "local",
            "value": null
          }, {
            "Functions": [],
            "InternalFunctions": [],
            "Refset": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "dataType": "DV_TEXT",
            "itemName": "Descrição não estruturada",
            "itemPath": "items.0.0.items.0.items.5.items.1.items.1",
            "node": {
              "code": "at0002",
              "description": "Descrição não estruturada do contacto",
              "text": "Descrição não estruturada"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]/[at0001]/[at0002]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }, {
            "Functions": [],
            "InternalFunctions": [],
            "Refset": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "cardinality": {
              "interval": {
                "lowerOccurrences": 1,
                "upperOccurrences": "*"
              },
              "ordered": false,
              "unique": false
            },
            "data_type": "Title",
            "itemName": "Descrição estrutrada",
            "itemPath": "items.0.0.items.0.items.5.items.1.items.2",
            "items": [{
              "Functions": [],
              "InternalFunctions": [],
              "Refset": [],
              "TaskEditable": ["All"],
              "TaskInReport": ["All"],
              "TaskVisible": ["All"],
              "dataType": "DV_TEXT",
              "itemName": "Código do país",
              "itemPath": "items.0.0.items.0.items.5.items.1.items.2.items.0",
              "node": {
                "code": "at0005",
                "description": "Código do país",
                "text": "Código do país"
              },
              "occurrences": {
                "lowerOccurrences": 0,
                "upperOccurrences": 1
              },
              "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]/[at0001]/[at0003]/[at0005]",
              "ruleMandatory": [],
              "ruleVisibility": [],
              "value": null
            }, {
              "Functions": [],
              "InternalFunctions": [],
              "Refset": [],
              "TaskEditable": ["All"],
              "TaskInReport": ["All"],
              "TaskVisible": ["All"],
              "dataType": "DV_TEXT",
              "itemName": "Código da área",
              "itemPath": "items.0.0.items.0.items.5.items.1.items.2.items.1",
              "node": {
                "code": "at0006",
                "description": "Código telefónico da área",
                "text": "Código da área"
              },
              "occurrences": {
                "lowerOccurrences": 0,
                "upperOccurrences": 1
              },
              "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]/[at0001]/[at0003]/[at0006]",
              "ruleMandatory": [],
              "ruleVisibility": [],
              "value": null
            }, {
              "Functions": [],
              "InternalFunctions": [],
              "Refset": [],
              "TaskEditable": ["All"],
              "TaskInReport": ["All"],
              "TaskVisible": ["All"],
              "dataType": "DV_TEXT",
              "itemName": "Número",
              "itemPath": "items.0.0.items.0.items.5.items.1.items.2.items.2",
              "node": {
                "code": "at0007",
                "description": "Número de telefone",
                "text": "Número"
              },
              "occurrences": {
                "lowerOccurrences": 0,
                "upperOccurrences": 1
              },
              "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]/[at0001]/[at0003]/[at0007]",
              "ruleMandatory": [],
              "ruleVisibility": [],
              "value": null
            }, {
              "Functions": [],
              "InternalFunctions": [],
              "Refset": [],
              "TaskEditable": ["All"],
              "TaskInReport": ["All"],
              "TaskVisible": ["All"],
              "dataType": "DV_TEXT",
              "itemName": "Extensão",
              "itemPath": "items.0.0.items.0.items.5.items.1.items.2.items.3",
              "node": {
                "code": "at0019",
                "description": "Número da extensão telefónica",
                "text": "Extensão"
              },
              "occurrences": {
                "lowerOccurrences": 0,
                "upperOccurrences": 1
              },
              "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]/[at0001]/[at0003]/[at0019]",
              "ruleMandatory": [],
              "ruleVisibility": [],
              "value": null
            }],
            "node": {
              "code": "at0003",
              "description": "Descrição estruturada de números de telefone através dos seus componentes",
              "text": "Descrição estrutrada"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]/[at0001]/[at0003]",
            "ruleMandatory": [],
            "ruleVisibility": []
          }],
          "node": {
            "code": "at0001",
            "description": "Um ou mais contactos de um indivíduo",
            "text": "Contactos"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": "*"
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]/[at0001]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": []
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_TEXT",
          "itemName": "Endereço eletrónico",
          "itemPath": "items.0.0.items.0.items.5.items.2",
          "node": {
            "code": "at0009",
            "description": "Endereço eletrónico",
            "text": "Endereço eletrónico"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": "*"
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]/[at0009]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }],
        "node": {
          "code": "at0000",
          "description": "Detalhe de telefone, fax, pessoal ou institucional",
          "text": "Detalhes do contacto"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.telecom_details.v0]",
        "ruleMandatory": [],
        "ruleVisibility": []
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "Refset": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "archetype_id": "openEHR-EHR-CLUSTER.address_cc.v0",
        "cardinality": {
          "interval": {
            "lowerOccurrences": 1,
            "upperOccurrences": "*"
          },
          "ordered": false,
          "unique": false
        },
        "data_type": "Title",
        "itemName": "Endereço",
        "itemPath": "items.0.0.items.0.items.6",
        "items": [{
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "constraints": [{
            "default_dataType": "DV_CODED_TEXT",
            "default_value": {
              "code": "at0002",
              "value": "Home"
            },
            "field": "items[at0001]",
            "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0001]",
            "rm_attribute_name": "value"
          }],
          "dataType": "DV_CODED_TEXT",
          "itemName": "Objetivo do registo do endereço",
          "itemPath": "items.0.0.items.0.items.6.items.0",
          "itemsList": [{
            "code": "at0002",
            "description": "Endereço do domicílio",
            "text": "Domicílio"
          }],
          "node": {
            "code": "at0001",
            "description": "O objetivo do endereço.",
            "text": "Objetivo do registo do endereço"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0001]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "terminology_id": "local",
          "value": {
            "code": "at0002",
            "description": "Endereço do domicílio",
            "text": "Domicílio"
          }
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_CODED_TEXT",
          "itemName": "Tipo",
          "itemPath": "items.0.0.items.0.items.6.items.1",
          "itemsList": [{
            "code": "at0007",
            "description": "Código postal do endereço",
            "text": "Código postal"
          }, {
            "code": "at0008",
            "description": "Morada (?)",
            "text": "Morada"
          }, {
            "code": "at0009",
            "description": "Morada e código postal (?)",
            "text": "Ambos"
          }],
          "node": {
            "code": "at0006",
            "description": "Distingue entre endereços físicos (aqueles que se pode visitar) e endereços para correspondência (por exemplo, caixas postais e endereços de atendimento). A maioria dos endereços representam ambos.",
            "text": "Tipo"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0006]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "terminology_id": "local",
          "value": null
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_TEXT",
          "itemName": "Texto",
          "itemPath": "items.0.0.items.0.items.6.items.2",
          "node": {
            "code": "at0010",
            "description": "Uma descrição completa do endereço.",
            "text": "Texto"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0010]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_TEXT",
          "itemName": "Linha",
          "itemPath": "items.0.0.items.0.items.6.items.3",
          "node": {
            "code": "at0011",
            "description": "Este componente contém o número da casa, número do apartamento, nome da rua, direção da rua, apartado, dicas de entrega e informações de endereço semelhantes.",
            "text": "Linha"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": "*"
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0011]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_TEXT",
          "itemName": "Cidade",
          "itemPath": "items.0.0.items.0.items.6.items.4",
          "node": {
            "code": "at0012",
            "description": "O nome da cidade vila ou comunidade",
            "text": "Cidade"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0012]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_TEXT",
          "itemName": "Distrito",
          "itemPath": "items.0.0.items.0.items.6.items.5",
          "node": {
            "code": "at0013",
            "description": "Nome do distrito",
            "text": "Distrito"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0013]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_TEXT",
          "itemName": "Código postal",
          "itemPath": "items.0.0.items.0.items.6.items.6",
          "node": {
            "code": "at0014",
            "description": "Um código postal que designa uma região definida pelo serviço postal.",
            "text": "Código postal"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0014]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_TEXT",
          "itemName": "País",
          "itemPath": "items.0.0.items.0.items.6.items.7",
          "node": {
            "code": "at0015",
            "description": "País - uma nação comummente\n reconhecida e geralmente aceite",
            "text": "País"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0015]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_DATE_TIME",
          "itemName": "Data de iníco da validade",
          "itemPath": "items.0.0.items.0.items.6.items.8",
          "node": {
            "code": "at0016",
            "description": "O início do período. O limite é inclusivo.",
            "text": "Data de iníco da validade"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0016]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": {
            "date": null,
            "time": null
          }
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_DATE_TIME",
          "itemName": "Data de fim da validade",
          "itemPath": "items.0.0.items.0.items.6.items.9",
          "node": {
            "code": "at0017",
            "description": "O fim do período. Se o final do período estiver omitido, significa que o período está em curso. O início pode ser no passado e a data de término no futuro, o que significa que o período é esperado/planeado terminar naquele momento.",
            "text": "Data de fim da validade"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]/[at0017]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": {
            "date": null,
            "time": null
          }
        }],
        "node": {
          "code": "at0000",
          "description": "Detalhes do endereço de acordo com os Recursos de Interoperabilidade de Assistência Médica Rápida.",
          "text": "Endereço"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.address_cc.v0]",
        "ruleMandatory": [],
        "ruleVisibility": []
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "Refset": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "archetype_id": "openEHR-EHR-CLUSTER.organisation_cc.v0",
        "cardinality": {
          "interval": {
            "lowerOccurrences": 1,
            "upperOccurrences": "*"
          },
          "ordered": false,
          "unique": false
        },
        "data_type": "Title",
        "itemName": "Organização",
        "itemPath": "items.0.0.items.0.items.7",
        "items": [{
          "Functions": [],
          "InternalFunctions": [],
          "Refset": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "archetype_id": "openEHR-EHR-CLUSTER.identifier_cc.v0",
          "cardinality": {
            "interval": {
              "lowerOccurrences": 1,
              "upperOccurrences": "*"
            },
            "ordered": false,
            "unique": false
          },
          "data_type": "Title",
          "itemName": "Identificador",
          "itemPath": "items.0.0.items.0.items.7.items.0",
          "items": [{
            "Functions": [],
            "InternalFunctions": [],
            "Refset": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "dataType": "DV_IDENTIFIER",
            "itemName": "ID",
            "itemPath": "items.0.0.items.0.items.7.items.0.items.0",
            "node": {
              "code": "at0001",
              "description": "O valor do identificador",
              "text": "ID"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.identifier_cc.v0]/[at0001]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": 11300
          }],
          "node": {
            "code": "at0000",
            "description": "Detalhes do identificador alinha com os recursos do FHIR",
            "text": "Identificador"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.identifier_cc.v0]",
          "ruleMandatory": [],
          "ruleVisibility": []
        }, {
          "Functions": [],
          "InternalFunctions": [{
            "affectedFields": {
              "items.0.0.items.0.items.7.items.0.items.0": {
                "body": {
                  "page": 0,
                  "props": [{
                    "idOrganizacao": "items.0.0.items.0.items.7.items.1"
                  }]
                },
                "codeColumn": null,
                "datatype": "DV_IDENTIFIER",
                "dependencies": [{
                  "columnRef": "idOrganizacao",
                  "field": {
                    "datatype": "DV_CODED_TEXT",
                    "name": "Organização - Nome",
                    "path": "items.0.0.items.0.items.7.items.1",
                    "upperOccurrences": 1
                  }
                }],
                "method": "post",
                "name": "Identificador - ID",
                "path": "items.0.0.items.0.items.7.items.0.items.0",
                "refsetId": "341",
                "refsetName": "Organizações",
                "resColumn": "idOrganizacao",
                "serviceName": "refsetConceptsPaginated?id=341",
                "textColumn": null,
                "upperOccurrences": 1,
                "url": "http://172.21.220.49:4010/"
              }
            },
            "type": "Preenchimento automático de campos"
          }],
          "Refset": ["http://172.21.220.49:4010/refsetConcepts?id=341&code=idOrganizacao&text=nomeOrganizacao"],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_CODED_TEXT",
          "itemName": "Nome",
          "itemPath": "items.0.0.items.0.items.7.items.1",
          "itemsList": [],
          "node": {
            "code": "at0012",
            "description": "Nome associado à organização.",
            "text": "Nome"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[at0012]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": {
            "code": "11300",
            "text": "SU MED.FISICA/REABILITACAO /HSA"
          }
        }],
        "node": {
          "code": "at0000",
          "description": "Detalhes da organização alinhados com o  FHIR.",
          "text": "Organização"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]",
        "ruleMandatory": [],
        "ruleVisibility": []
      }],
      "node": {
        "code": "at0000",
        "description": "Detalhes da organização alinhados com o  FHIR.",
        "text": "Organização"
      },
      "occurrences": {
        "lowerOccurrences": 0,
        "upperOccurrences": 1
      },
      "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[openEHR-EHR-CLUSTER.organisation_cc.v0]",
      "ruleMandatory": [],
      "ruleVisibility": []
    }, {
      "Functions": [],
      "InternalFunctions": [],
      "Refset": ["http://172.21.220.49:4010/refsetConcepts?id=223&code=NUM_MECANOGRAFICO&text=NOME"],
      "TaskEditable": ["All"],
      "TaskInReport": ["All"],
      "TaskVisible": ["All"],
      "dataType": "DV_CODED_TEXT",
      "itemName": "Responsável pela organização",
      "itemPath": "items.0.0.items.1",
      "itemsList": [],
      "node": {
        "code": "at0004",
        "text": "Responsável pela organização"
      },
      "occurrences": {
        "lowerOccurrences": 0,
        "upperOccurrences": 1
      },
      "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[at0004]",
      "ruleMandatory": [],
      "ruleVisibility": [],
      "value": null
    }, {
      "Functions": [],
      "InternalFunctions": [],
      "Refset": ["http://172.21.220.49:4010/refsetConcepts?id=223&code=NUM_MECANOGRAFICO&text=NOME"],
      "TaskEditable": ["All"],
      "TaskInReport": ["All"],
      "TaskVisible": ["All"],
      "dataType": "DV_CODED_TEXT",
      "itemName": "Responsável pela atualização",
      "itemPath": "items.0.0.items.2",
      "itemsList": [],
      "node": {
        "code": "at0003",
        "description": "Pessoa/serviço responsável pela actualização dos dados",
        "text": "Responsável pela atualização"
      },
      "occurrences": {
        "lowerOccurrences": 0,
        "upperOccurrences": 1
      },
      "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]/[at0003]",
      "ruleMandatory": [],
      "ruleVisibility": [],
      "terminology_id": "external",
      "value": null
    }],
    "node": {
      "code": "at0000",
      "description": "Organização",
      "text": "Organização"
    },
    "occurrences": {
      "lowerOccurrences": 0,
      "upperOccurrences": 1
    },
    "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]/[openEHR-EHR-ADMIN_ENTRY.organizacion.v0]",
    "ruleMandatory": [],
    "ruleVisibility": [],
    "xsi_type": "C_ARCHETYPE_ROOT"
  }]],
  "node": {
    "code": "at0000",
    "description": "Administrativo",
    "text": "Instituição"
  },
  "occurrences": {
    "lowerOccurrences": 1,
    "upperOccurrences": 1
  },
  "path": "[openEHR-EHR-COMPOSITION.administrativo.v0]",
  "rm_type_name": "COMPOSITION",
  "ruleMandatory": [],
  "ruleVisibility": [],
  "templateId": "bbb14077-700c-4be1-9fb6-7495108f16da",
  "templateName": "Instituição",
  "themeColor": "default"
};
export default json;