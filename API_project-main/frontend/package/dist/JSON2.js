const json = {
  "Functions": [],
  "InternalFunctions": [],
  "TaskEditable": ["All"],
  "TaskInReport": ["All"],
  "TaskVisible": ["All"],
  "archetypeId": "openEHR-EHR-COMPOSITION.encounter.v1",
  "category": {
    "code": 433,
    "text": "event"
  },
  "itemName": "FormDefeiton1",
  "itemPath": "",
  "items": [[{
    "Functions": [],
    "InternalFunctions": [],
    "TaskEditable": ["All"],
    "TaskInReport": ["All"],
    "TaskVisible": ["All"],
    "archetype_id": "openEHR-EHR-SECTION.adhoc.v1",
    "data_type": "Title",
    "itemName": "Admissão Hospitalar",
    "itemPath": "items.0.0",
    "items": [{
      "Functions": [],
      "InternalFunctions": [],
      "TaskEditable": ["All"],
      "TaskInReport": ["All"],
      "TaskVisible": ["All"],
      "archetype_id": "openEHR-EHR-ADMIN_ENTRY.episode_institution.v0",
      "data_type": "Title",
      "itemName": "Internamento",
      "itemPath": "items.0.0.items.0",
      "items": [{
        "Functions": [],
        "InternalFunctions": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "dataType": "DV_TEXT",
        "itemName": "Tipo de admissão",
        "itemPath": "items.0.0.items.0.items.0",
        "node": {
          "code": "at0009",
          "description": "*The type of admission. (en)",
          "text": "Tipo de admissão"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-ADMIN_ENTRY.episode_institution.v0]/[at0009]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "value": null
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "dataType": "DV_CODED_TEXT",
        "itemName": "Proveniência",
        "itemPath": "items.0.0.items.0.items.1",
        "node": {
          "code": "at0007",
          "description": "Origem do utente admitido na instituição.",
          "text": "Proveniência"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-ADMIN_ENTRY.episode_institution.v0]/[at0007]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "terminology_id": "external",
        "uri": "terminology://fhir.hl7.org/ValueSet/$expand?url=https://AIDA-REFSETS",
        "value": null
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "dataType": "DV_TEXT",
        "itemName": "Reinternamento",
        "itemPath": "items.0.0.items.0.items.2",
        "node": {
          "code": "at0010",
          "description": "*Additional narrative about the episode, not captured in other fields. (en)",
          "text": "Reinternamento"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-ADMIN_ENTRY.episode_institution.v0]/[at0010]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "value": null
      }],
      "node": {
        "code": "at0000",
        "description": "Detalhes administrativos sobre um período de atendimento ao utente internado entre uma admissão formal ou estatística e uma separação formal ou estatística, caracterizado por apenas um tipo de atendimento de uma instituição de saúde.",
        "text": "Internamento"
      },
      "occurrences": {
        "lowerOccurrences": 0,
        "upperOccurrences": 1
      },
      "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-ADMIN_ENTRY.episode_institution.v0]",
      "ruleMandatory": [],
      "ruleVisibility": [],
      "xsi_type": "C_ARCHETYPE_ROOT"
    }, {
      "Functions": [],
      "InternalFunctions": [],
      "TaskEditable": ["All"],
      "TaskInReport": ["All"],
      "TaskVisible": ["All"],
      "archetype_id": "openEHR-EHR-EVALUATION.communication_capability.v1",
      "data_type": "Title",
      "itemName": "Capacidade de comunicação",
      "itemPath": "items.0.0.items.1",
      "items": [{
        "Functions": [],
        "InternalFunctions": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "data_type": "Title",
        "itemName": "Idioma preferido",
        "itemPath": "items.0.0.items.1.items.0",
        "items": [{
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "archetype_id": "openEHR-EHR-CLUSTER.language.v1",
          "cardinality": {
            "interval": {
              "lowerOccurrences": 1,
              "upperOccurrences": "*"
            },
            "ordered": false,
            "unique": false
          },
          "data_type": "Title",
          "itemName": "Idioma",
          "itemPath": "items.0.0.items.1.items.0.items.0",
          "items": [{
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "dataType": "DV_TEXT",
            "itemName": "Nome do idioma",
            "itemPath": "items.0.0.items.1.items.0.items.0.items.0",
            "node": {
              "code": "at0001",
              "description": "O nome do idioma.",
              "text": "Nome do idioma"
            },
            "occurrences": {
              "lowerOccurrences": 1,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.communication_capability.v1]/[openEHR-EHR-CLUSTER.language.v1]/[at0001]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }],
          "node": {
            "code": "at0000",
            "description": "Uma colecção de palavras, a sua pronúncia e métodos de combinação, compreendidas por uma comunidade específica e utilizadas como forma de comunicação.",
            "text": "Idioma"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.communication_capability.v1]/[openEHR-EHR-CLUSTER.language.v1]",
          "ruleMandatory": [],
          "ruleVisibility": []
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_CODED_TEXT",
          "itemName": "Comunica em Português",
          "itemPath": "items.0.0.items.1.items.0.items.1",
          "itemsList": [{
            "code": "local_terms::1",
            "text": "Não"
          }],
          "node": {
            "code": "at0021",
            "description": "Narrativa adicional sobre a capacidade de utilização de idioma específico, não registado noutros campos.",
            "text": "Comunica em Português"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.communication_capability.v1]/[at0021]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "terminology_id": "local_terms",
          "value": null
        }],
        "node": {
          "code": "at0019",
          "description": "Idioma e/ou método de comunicação preferido para um indivíduo.",
          "text": "Idioma preferido"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": "*"
        },
        "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.communication_capability.v1]/[at0015]",
        "ruleMandatory": [],
        "ruleVisibility": []
      }],
      "node": {
        "code": "at0000",
        "description": "A capacidade de um indivíduo para comunicar.",
        "text": "Capacidade de comunicação"
      },
      "occurrences": {
        "lowerOccurrences": 0,
        "upperOccurrences": 1
      },
      "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.communication_capability.v1]",
      "ruleMandatory": [],
      "ruleVisibility": [],
      "xsi_type": "C_ARCHETYPE_ROOT"
    }, {
      "Functions": [],
      "InternalFunctions": [],
      "TaskEditable": ["All"],
      "TaskInReport": ["All"],
      "TaskVisible": ["All"],
      "archetype_id": "openEHR-EHR-SECTION.adhoc.v1",
      "data_type": "Title",
      "itemName": "Alertas",
      "itemPath": "items.0.0.items.2",
      "items": [],
      "node": {
        "code": "at0000",
        "description": "Um cabeçalho de secção genérico que deve ser renomeado, para se adequar a um contexto clínico específico.",
        "text": "Alertas"
      },
      "occurrences": {
        "lowerOccurrences": 0,
        "upperOccurrences": 1
      },
      "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]",
      "ruleMandatory": [],
      "ruleVisibility": [],
      "xsi_type": "C_ARCHETYPE_ROOT"
    }, {
      "Functions": [],
      "InternalFunctions": [],
      "TaskEditable": ["All"],
      "TaskInReport": ["All"],
      "TaskVisible": ["All"],
      "archetype_id": "openEHR-EHR-OBSERVATION.story.v1",
      "data_type": "Title",
      "itemName": "Enquadramento",
      "itemPath": "items.0.0.items.3",
      "items": [{
        "Functions": [],
        "InternalFunctions": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "dataType": "DV_TEXT",
        "itemName": "Enquadramento",
        "itemPath": "items.0.0.items.3.items.0",
        "node": {
          "code": "at0004",
          "description": "Descrição narrativa da história ou história clínica do utente em questão.",
          "text": "Enquadramento"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": "*"
        },
        "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.story.v1]/[at0004]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "value": null
      }],
      "node": {
        "code": "at0000",
        "description": "A história clínica subjectiva do utente,  registada directamente por ele, ou relatada a um médico pelo próprio utente ou por um cuidador.",
        "text": "Enquadramento"
      },
      "occurrences": {
        "lowerOccurrences": 0,
        "upperOccurrences": 1
      },
      "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.story.v1]",
      "ruleMandatory": [],
      "ruleVisibility": [],
      "xsi_type": "C_ARCHETYPE_ROOT"
    }, {
      "Functions": [],
      "InternalFunctions": [],
      "TaskEditable": ["All"],
      "TaskInReport": ["All"],
      "TaskVisible": ["All"],
      "archetype_id": "openEHR-EHR-SECTION.adhoc.v1",
      "data_type": "Title",
      "itemName": "Diagnósticos de admissão",
      "itemPath": "items.0.0.items.4",
      "items": [{
        "Functions": [],
        "InternalFunctions": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "archetype_id": "openEHR-EHR-EVALUATION.problem_diagnosis.v1",
        "data_type": "Title",
        "itemName": "Diagnóstico Principal",
        "itemPath": "items.0.0.items.4.items.0",
        "items": [{
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_CODED_TEXT",
          "itemName": "Diagnóstico",
          "itemPath": "items.0.0.items.4.items.0.items.0",
          "node": {
            "code": "at0002",
            "description": "Identificação do problema ou diagnóstico, por nome",
            "text": "Diagnóstico"
          },
          "occurrences": {
            "lowerOccurrences": 1,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[at0002]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "archetype_id": "openEHR-EHR-CLUSTER.problem_qualifier.v1",
          "cardinality": {
            "interval": {
              "lowerOccurrences": 1,
              "upperOccurrences": "*"
            },
            "ordered": false,
            "unique": false
          },
          "data_type": "Title",
          "itemName": "Qualificador do Problema/Diagnóstico",
          "itemPath": "items.0.0.items.4.items.0.items.1",
          "items": [{
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "constraints": [{
              "default_dataType": "DV_CODED_TEXT",
              "default_value": {
                "code": "at0064",
                "value": "Principal diagnosis"
              },
              "field": "items[at0063]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
              "rm_attribute_name": "value"
            }, {
              "default_dataType": "DV_CODED_TEXT",
              "default_value": {
                "code": "at0066",
                "value": "Secondary diagnosis"
              },
              "field": "items[at0063]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
              "rm_attribute_name": "value"
            }],
            "dataType": "DV_CODED_TEXT",
            "itemName": "Categoria do diagnóstico",
            "itemPath": "items.0.0.items.4.items.0.items.1.items.0",
            "itemsList": [{
              "code": "at0064",
              "description": "O diagnóstico definido como o principal responsável por despoletar um episódio de consulta médica, um episódio de consulta domiciliaria ou atendimento num estabelecimento de saúde.",
              "text": "Diagnóstico principal"
            }],
            "node": {
              "code": "at0063",
              "description": "Categoria do problema ou diagnóstico dentro de um determinado episódio de cuidado e/ou contexto do cuidado local",
              "text": "Categoria do diagnóstico"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": "*"
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "terminology_id": "local",
            "value": null
          }, {
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "constraints": [{
              "default_dataType": "DV_CODED_TEXT",
              "default_value": {
                "code": "at0064",
                "value": "Principal diagnosis"
              },
              "field": "items[at0063]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
              "rm_attribute_name": "value"
            }, {
              "default_dataType": "DV_CODED_TEXT",
              "default_value": {
                "code": "at0066",
                "value": "Secondary diagnosis"
              },
              "field": "items[at0063]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
              "rm_attribute_name": "value"
            }],
            "dataType": "DV_TEXT",
            "itemName": "Categoria do diagnóstico",
            "itemPath": "items.0.0.items.4.items.0.items.1.items.1",
            "node": {
              "code": "at0063",
              "description": "Categoria do problema ou diagnóstico dentro de um determinado episódio de cuidado e/ou contexto do cuidado local",
              "text": "Categoria do diagnóstico"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": "*"
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }, {
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "constraints": [{
              "default_dataType": "DV_BOOLEAN",
              "field": "items[at0073]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
              "rm_attribute_name": "value"
            }, {
              "default_dataType": "DV_BOOLEAN",
              "field": "items[at0073]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
              "rm_attribute_name": "value"
            }, {
              "default_dataType": "DV_BOOLEAN",
              "field": "items[at0073]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
              "rm_attribute_name": "value"
            }],
            "dataType": "DV_BOOLEAN",
            "itemName": "Diagnóstico de admissão?",
            "itemPath": "items.0.0.items.4.items.0.items.1.items.2",
            "node": {
              "code": "at0073",
              "description": "O problema ou diagnóstico estava presente na admissão?",
              "text": "Diagnóstico de admissão?"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }],
          "node": {
            "code": "at0000",
            "description": "Qualificador contextual ou temporal para um problema ou diagnóstico especificado.",
            "text": "Qualificador do Problema/Diagnóstico"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]",
          "ruleMandatory": [],
          "ruleVisibility": []
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_DATE_TIME",
          "itemName": "Última atualização",
          "itemPath": "items.0.0.items.4.items.0.items.2",
          "node": {
            "code": "at0070",
            "description": "Data da última atualização do problema ou diagnóstico",
            "text": "Última atualização"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[at0070]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": {
            "date": null,
            "time": null
          }
        }],
        "node": {
          "code": "at0000",
          "description": "Detalhes sobre uma condição de saúde identificada, lesões, deficiência ou qualquer outra situação que tenha impacto sobre o bem-estar físico, mental e / ou social de um indivíduo.",
          "text": "Diagnóstico Principal"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "xsi_type": "C_ARCHETYPE_ROOT"
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "archetype_id": "openEHR-EHR-EVALUATION.problem_diagnosis.v1",
        "data_type": "Title",
        "itemName": "Diagnóstico Secundário",
        "itemPath": "items.0.0.items.4.items.1",
        "items": [{
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_CODED_TEXT",
          "itemName": "Diagnóstico",
          "itemPath": "items.0.0.items.4.items.1.items.0",
          "node": {
            "code": "at0002",
            "description": "Identificação do problema ou diagnóstico, por nome",
            "text": "Diagnóstico"
          },
          "occurrences": {
            "lowerOccurrences": 1,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[at0002]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "archetype_id": "openEHR-EHR-CLUSTER.problem_qualifier.v1",
          "cardinality": {
            "interval": {
              "lowerOccurrences": 1,
              "upperOccurrences": "*"
            },
            "ordered": false,
            "unique": false
          },
          "data_type": "Title",
          "itemName": "Qualificador do Problema/Diagnóstico",
          "itemPath": "items.0.0.items.4.items.1.items.1",
          "items": [{
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "constraints": [{
              "default_dataType": "DV_CODED_TEXT",
              "default_value": {
                "code": "at0064",
                "value": "Principal diagnosis"
              },
              "field": "items[at0063]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
              "rm_attribute_name": "value"
            }, {
              "default_dataType": "DV_CODED_TEXT",
              "default_value": {
                "code": "at0066",
                "value": "Secondary diagnosis"
              },
              "field": "items[at0063]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
              "rm_attribute_name": "value"
            }],
            "dataType": "DV_CODED_TEXT",
            "itemName": "Categoria do diagnóstico",
            "itemPath": "items.0.0.items.4.items.1.items.1.items.0",
            "itemsList": [{
              "code": "at0066",
              "description": "Um problema ou diagnóstico que ocorre ao mesmo tempo que o problema principal ou diagnóstico. Também pode ser denominada como uma situação de comorbidade.",
              "text": "Diagnóstico secundário"
            }],
            "node": {
              "code": "at0063",
              "description": "Categoria do problema ou diagnóstico dentro de um determinado episódio de cuidado e/ou contexto do cuidado local",
              "text": "Categoria do diagnóstico"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": "*"
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "terminology_id": "local",
            "value": null
          }, {
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "constraints": [{
              "default_dataType": "DV_CODED_TEXT",
              "default_value": {
                "code": "at0064",
                "value": "Principal diagnosis"
              },
              "field": "items[at0063]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
              "rm_attribute_name": "value"
            }, {
              "default_dataType": "DV_CODED_TEXT",
              "default_value": {
                "code": "at0066",
                "value": "Secondary diagnosis"
              },
              "field": "items[at0063]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
              "rm_attribute_name": "value"
            }],
            "dataType": "DV_TEXT",
            "itemName": "Categoria do diagnóstico",
            "itemPath": "items.0.0.items.4.items.1.items.1.items.1",
            "node": {
              "code": "at0063",
              "description": "Categoria do problema ou diagnóstico dentro de um determinado episódio de cuidado e/ou contexto do cuidado local",
              "text": "Categoria do diagnóstico"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": "*"
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0063]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }, {
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "constraints": [{
              "default_dataType": "DV_BOOLEAN",
              "field": "items[at0073]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
              "rm_attribute_name": "value"
            }, {
              "default_dataType": "DV_BOOLEAN",
              "field": "items[at0073]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
              "rm_attribute_name": "value"
            }, {
              "default_dataType": "DV_BOOLEAN",
              "field": "items[at0073]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
              "rm_attribute_name": "value"
            }],
            "dataType": "DV_BOOLEAN",
            "itemName": "Diagnóstico de admissão?",
            "itemPath": "items.0.0.items.4.items.1.items.1.items.2",
            "node": {
              "code": "at0073",
              "description": "O problema ou diagnóstico estava presente na admissão?",
              "text": "Diagnóstico de admissão?"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }],
          "node": {
            "code": "at0000",
            "description": "Qualificador contextual ou temporal para um problema ou diagnóstico especificado.",
            "text": "Qualificador do Problema/Diagnóstico"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]",
          "ruleMandatory": [],
          "ruleVisibility": []
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_DATE_TIME",
          "itemName": "Última atualização",
          "itemPath": "items.0.0.items.4.items.1.items.2",
          "node": {
            "code": "at0070",
            "description": "Data da última atualização do problema ou diagnóstico",
            "text": "Última atualização"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[at0070]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": {
            "date": null,
            "time": null
          }
        }],
        "node": {
          "code": "at0000",
          "description": "Detalhes sobre uma condição de saúde identificada, lesões, deficiência ou qualquer outra situação que tenha impacto sobre o bem-estar físico, mental e / ou social de um indivíduo.",
          "text": "Diagnóstico Secundário"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "xsi_type": "C_ARCHETYPE_ROOT"
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "archetype_id": "openEHR-EHR-EVALUATION.problem_diagnosis.v1",
        "data_type": "Title",
        "itemName": "Outro Diagnóstico",
        "itemPath": "items.0.0.items.4.items.2",
        "items": [{
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_CODED_TEXT",
          "itemName": "Diagnóstico",
          "itemPath": "items.0.0.items.4.items.2.items.0",
          "node": {
            "code": "at0002",
            "description": "Identificação do problema ou diagnóstico, por nome",
            "text": "Diagnóstico"
          },
          "occurrences": {
            "lowerOccurrences": 1,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[at0002]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "archetype_id": "openEHR-EHR-CLUSTER.problem_qualifier.v1",
          "cardinality": {
            "interval": {
              "lowerOccurrences": 1,
              "upperOccurrences": "*"
            },
            "ordered": false,
            "unique": false
          },
          "data_type": "Title",
          "itemName": "Qualificador do Problema/Diagnóstico",
          "itemPath": "items.0.0.items.4.items.2.items.1",
          "items": [{
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "constraints": [{
              "default_dataType": "DV_BOOLEAN",
              "field": "items[at0073]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
              "rm_attribute_name": "value"
            }, {
              "default_dataType": "DV_BOOLEAN",
              "field": "items[at0073]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
              "rm_attribute_name": "value"
            }, {
              "default_dataType": "DV_BOOLEAN",
              "field": "items[at0073]",
              "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
              "rm_attribute_name": "value"
            }],
            "dataType": "DV_BOOLEAN",
            "itemName": "Diagnóstico de admissão?",
            "itemPath": "items.0.0.items.4.items.2.items.1.items.0",
            "node": {
              "code": "at0073",
              "description": "O problema ou diagnóstico estava presente na admissão?",
              "text": "Diagnóstico de admissão?"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]/[at0073]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }],
          "node": {
            "code": "at0000",
            "description": "Qualificador contextual ou temporal para um problema ou diagnóstico especificado.",
            "text": "Qualificador do Problema/Diagnóstico"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[openEHR-EHR-CLUSTER.problem_qualifier.v1]",
          "ruleMandatory": [],
          "ruleVisibility": []
        }, {
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_DATE_TIME",
          "itemName": "Última atualização",
          "itemPath": "items.0.0.items.4.items.2.items.2",
          "node": {
            "code": "at0070",
            "description": "Data da última atualização do problema ou diagnóstico",
            "text": "Última atualização"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]/[at0070]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": {
            "date": null,
            "time": null
          }
        }],
        "node": {
          "code": "at0000",
          "description": "Detalhes sobre uma condição de saúde identificada, lesões, deficiência ou qualquer outra situação que tenha impacto sobre o bem-estar físico, mental e / ou social de um indivíduo.",
          "text": "Outro Diagnóstico"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-EVALUATION.problem_diagnosis.v1]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "xsi_type": "C_ARCHETYPE_ROOT"
      }, {
        "Functions": [],
        "InternalFunctions": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "archetype_id": "openEHR-EHR-OBSERVATION.progress_note.v1",
        "data_type": "Title",
        "itemName": "Observações",
        "itemPath": "items.0.0.items.4.items.3",
        "items": [{
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "dataType": "DV_TEXT",
          "itemName": "Observações",
          "itemPath": "items.0.0.items.4.items.3.items.0",
          "node": {
            "code": "at0004",
            "description": "Descrição narrativa de eventos de saúde, condição de saúde, achados clínicos e opiniões num determinado espaço temporal",
            "text": "Observações"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": 1
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.progress_note.v1]/[at0004]",
          "ruleMandatory": [],
          "ruleVisibility": [],
          "value": null
        }],
        "node": {
          "code": "at0000",
          "description": "Descrição narrativa dos eventos de saúde sobre um indivíduo na perspectiva do prestador de cuidados e num um determinado espaço temporal",
          "text": "Observações"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.progress_note.v1]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "xsi_type": "C_ARCHETYPE_ROOT"
      }],
      "node": {
        "code": "at0000",
        "description": "Um cabeçalho de secção genérico que deve ser renomeado, para se adequar a um contexto clínico específico.",
        "text": "Diagnósticos de admissão"
      },
      "occurrences": {
        "lowerOccurrences": 0,
        "upperOccurrences": 1
      },
      "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]",
      "ruleMandatory": [],
      "ruleVisibility": [],
      "xsi_type": "C_ARCHETYPE_ROOT"
    }, {
      "Functions": [],
      "InternalFunctions": [],
      "TaskEditable": ["All"],
      "TaskInReport": ["All"],
      "TaskVisible": ["All"],
      "archetype_id": "openEHR-EHR-SECTION.adhoc.v1",
      "data_type": "Title",
      "itemName": "Infecção à admissão",
      "itemPath": "items.0.0.items.5",
      "items": [{
        "Functions": [],
        "InternalFunctions": [],
        "TaskEditable": ["All"],
        "TaskInReport": ["All"],
        "TaskVisible": ["All"],
        "archetype_id": "openEHR-EHR-OBSERVATION.problem_screening.v0",
        "data_type": "Title",
        "itemName": "Questionário de rastreio de Problemas/Diagnósticos",
        "itemPath": "items.0.0.items.5.items.0",
        "items": [{
          "Functions": [],
          "InternalFunctions": [],
          "TaskEditable": ["All"],
          "TaskInReport": ["All"],
          "TaskVisible": ["All"],
          "data_type": "Title",
          "itemName": "Infecção à admissão",
          "itemPath": "items.0.0.items.5.items.0.items.0",
          "items": [{
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "dataType": "DV_CODED_TEXT",
            "itemName": "Infecção à admissão",
            "itemPath": "items.0.0.items.5.items.0.items.0.items.0",
            "node": {
              "code": "at0004",
              "description": "Identificação de um problema , diagnóstico ou grupo de problemas pela sua designação",
              "text": "Infecção à admissão"
            },
            "occurrences": {
              "lowerOccurrences": 1,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.problem_screening.v0]/[at0004]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }, {
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "dataType": "DV_CODED_TEXT",
            "itemName": "Presença",
            "itemPath": "items.0.0.items.5.items.0.items.0.items.1",
            "itemsList": [{
              "code": "at0023",
              "description": "*The specific problem or diagnosis; or grouping of problems or diagnoses is present. (en)",
              "text": "Sim"
            }, {
              "code": "at0024",
              "description": "*The specific problem or diagnosis; or grouping of problems or diagnoses is not present. (en)",
              "text": "Não"
            }, {
              "code": "at0027",
              "description": "*It is not known whether the specific problem or diagnosis; or grouping of problems or diagnoses is present or absent. (en)",
              "text": "Desconhecido"
            }],
            "node": {
              "code": "at0005",
              "description": "*Is there a history of the specific problem or diagnosis related to the screening purpose? (en)",
              "text": "Presença"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.problem_screening.v0]/[at0005]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "terminology_id": "local",
            "value": null
          }, {
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "dataType": "DV_TEXT",
            "itemName": "Presença",
            "itemPath": "items.0.0.items.5.items.0.items.0.items.2",
            "node": {
              "code": "at0005",
              "description": "*Is there a history of the specific problem or diagnosis related to the screening purpose? (en)",
              "text": "Presença"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.problem_screening.v0]/[at0005]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }, {
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "dataType": "DV_BOOLEAN",
            "itemName": "Presença",
            "itemPath": "items.0.0.items.5.items.0.items.0.items.3",
            "node": {
              "code": "at0005",
              "description": "*Is there a history of the specific problem or diagnosis related to the screening purpose? (en)",
              "text": "Presença"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.problem_screening.v0]/[at0005]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }, {
            "Functions": [],
            "InternalFunctions": [],
            "TaskEditable": ["All"],
            "TaskInReport": ["All"],
            "TaskVisible": ["All"],
            "dataType": "DV_TEXT",
            "itemName": "Local da infecção",
            "itemPath": "items.0.0.items.5.items.0.items.0.items.4",
            "node": {
              "code": "at0025",
              "description": "*Additional narrative about the specific problem/diagnosis question, not captured in other fields. (en)",
              "text": "Local da infecção"
            },
            "occurrences": {
              "lowerOccurrences": 0,
              "upperOccurrences": 1
            },
            "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.problem_screening.v0]/[at0025]",
            "ruleMandatory": [],
            "ruleVisibility": [],
            "value": null
          }],
          "node": {
            "code": "at0022",
            "text": "Infecção à admissão"
          },
          "occurrences": {
            "lowerOccurrences": 0,
            "upperOccurrences": "*"
          },
          "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.problem_screening.v0]/[at0022]",
          "ruleMandatory": [],
          "ruleVisibility": []
        }],
        "node": {
          "code": "at0000",
          "description": "Conjunto de questões e respostas associadas utilizadas para o rastreio de problemas ou diagnósticos",
          "text": "Questionário de rastreio de Problemas/Diagnósticos"
        },
        "occurrences": {
          "lowerOccurrences": 0,
          "upperOccurrences": 1
        },
        "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-OBSERVATION.problem_screening.v0]",
        "ruleMandatory": [],
        "ruleVisibility": [],
        "xsi_type": "C_ARCHETYPE_ROOT"
      }],
      "node": {
        "code": "at0000",
        "description": "Um cabeçalho de secção genérico que deve ser renomeado, para se adequar a um contexto clínico específico.",
        "text": "Infecção à admissão"
      },
      "occurrences": {
        "lowerOccurrences": 0,
        "upperOccurrences": 1
      },
      "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]/[openEHR-EHR-SECTION.adhoc.v1]",
      "ruleMandatory": [],
      "ruleVisibility": [],
      "xsi_type": "C_ARCHETYPE_ROOT"
    }],
    "node": {
      "code": "at0000",
      "description": "Um cabeçalho de secção genérico que deve ser renomeado, para se adequar a um contexto clínico específico.",
      "text": "Admissão Hospitalar"
    },
    "occurrences": {
      "lowerOccurrences": 0,
      "upperOccurrences": 1
    },
    "path": "[openEHR-EHR-COMPOSITION.encounter.v1]/[openEHR-EHR-SECTION.adhoc.v1]",
    "ruleMandatory": [],
    "ruleVisibility": [],
    "xsi_type": "C_ARCHETYPE_ROOT"
  }]],
  "node": {
    "code": "at0000",
    "description": "Interação, contacto ou cuidados de saúde entre o receptor de cuidados e o profissional de saúde",
    "text": "FormDefeiton1"
  },
  "occurrences": {
    "lowerOccurrences": 1,
    "upperOccurrences": 1
  },
  "path": "[openEHR-EHR-COMPOSITION.encounter.v1]",
  "rm_type_name": "COMPOSITION",
  "ruleMandatory": [],
  "ruleVisibility": [],
  "templateId": "bb8632c9-0751-4e9a-8408-4272baed40aa",
  "templateName": "FormDefeiton1",
  "themeColor": "default"
};
export default json;