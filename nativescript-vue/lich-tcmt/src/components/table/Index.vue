<template>
  <StackLayout height="100%">
    <vn-skeleton :backgroundColor="bgLoading" class="my-2" v-if="loadingList"></vn-skeleton>
    <StackLayout v-if="!loadingList">
      <slot
        class="slot"
        name="content"
        v-bind:page="currentPage"
        v-bind:pages="pages"
        v-bind:totalData="totalData"
        v-bind:data="dataResults"
        v-bind:isArray="isArray"
        v-bind:isNotNull="isNotNull"
        v-bind:dateViewYear="dateViewYear"
        v-bind:dateViewMonthYear="dateViewMonthYear"
        v-bind:dateView="dateView"
        v-bind:objectView="objectView"
      ></slot>
    </StackLayout>
  </StackLayout>
</template>

<script>
export default {
  props: {
    bgLoading: {
      type: String,
      default: () => {
        return "#F9FCFE";
      },
    },
    allStorage: {
      type: Boolean,
      default: false
    },
    site: {
      type: String,
      default: () => {
        return "guest";
      },
    },
    db: {
      type: String,
      default: () => {
        return "";
      },
    },
    collection: {
      type: String,
      default: () => {
        return "";
      },
    },
    includes: {
      type: Array,
      default: () => {
        return [];
      },
    },
    sort: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pagesize: {
      type: Number,
      default: () => {
        return 15;
      },
    },
    paging: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    condition: {
      type: Array,
      default: () => {
        return [];
      },
    },
    queryFilter: {
      type: Array,
      default: () => {
        return [];
      },
    },
    keywords: {
      type: Array,
      default: () => {
        return [];
      },
    },
    queryParam: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    empty: {
      type: Boolean,
      default: () => {
        return false;
      },
    }
  },
  data() {
    return {
      loadingList: true,
      isPhone: true,
      currentPage: 1,
      pages: 1,
      totalData: 1,
      dataResults: [],
      isAndroidX: false
    };
  },
  mounted() {
    let vm = this;
    vm.$nextTick(async function () {
      vm.isPhone = global.API.deviceType === 'Tablet' ? false : true;
      vm.isAndroidX = global.API.isAndroid;
      await vm.clean();
      await vm.init();
    });
  },
  methods: {
    async pagging(page, conditions, keywords) {
      let vm = this;
      vm.currentPage = page;
      if (keywords) {
        if (conditions) {

        } else {
          conditions = []
        }
        let keywordsFilter = { bool: { should: [ ] } };

        for (let key in vm.keywords) {
          let mustKeyword = { bool: { must: [ ] } }
          let keySearchSplit = String(keywords).toLocaleLowerCase().replace(/,/g, ' ').replace(/\./g, ' ').replace(/-/g, ' ').replace(/–/g, ' ').replace(/:/g, ' ').replace(/\//g, ' ').replace(/  /g, ' ').split(' ');
          if (vm.keywords[key].endsWith('.raw')) {
            let query = {};
            query[vm.keywords[key]] = String(keywords).toLocaleLowerCase().replace(/,/g, ' ').replace(/\./g, ' ').replace(/-/g, ' ').replace(/–/g, ' ').replace(/:/g, ' ').replace(/\//g, ' ').replace(/  /g, ' ');
            mustKeyword['bool']['must'].push({
              match_phrase_prefix: query
            })
            for (const keyS of keySearchSplit) {
              let preX = {};
              preX[vm.keywords[key]] = String(keyS).toLocaleLowerCase();
              mustKeyword['bool']['must'].push({
                "prefix": preX
              });
            }
          } else {
            if (vm.keywords[key] === 'shortName') {
              let query = {};
              query[vm.keywords[key]] = String(keywords);
              mustKeyword['bool']['must'].push({
                match: query
              })
            } else {
              for (let search of keySearchSplit) {
                let query = {};
                if (search !== '') {
                  query[vm.keywords[key]] = search;
                  mustKeyword['bool']['must'].push({
                    match: query
                  })
                }
              }
            }
            
          }
          keywordsFilter['bool']['should'].push(mustKeyword);
        }
        conditions.push(keywordsFilter);
      }
      await vm.init(conditions);
    },
    async clean() {},
    async init(filter) {
      let vm = this;
      vm.loadingList = true;
      let bodyQuery = {};
      bodyQuery = {
        size: vm.pagesize,
        query: {
          bool: {
            filter: {
              match: {
                site: vm.site,
              },
            },
            must: [],
          },
        },
      };
      if (vm.includes) {
        bodyQuery["_source"] = {
          includes: vm.includes,
        };
      }
      if (vm.sort) {
        bodyQuery["sort"] = vm.sort;
      }
      // TODO SORT changing
      if (!vm.allStorage) {
        bodyQuery["query"]["bool"]["must"].push({
          match: {
            storage: "regular",
          },
        });
      }
      
      if (filter !== undefined) {
        for (const el of filter) {
          bodyQuery["query"]["bool"]["must"].push(el);
        }
      }
      bodyQuery["from"] = vm.currentPage * vm.pagesize - vm.pagesize;
      bodyQuery["size"] = vm.pagesize;
      for (let el of vm.condition) {
        bodyQuery["query"]["bool"]["must"].push(el);
      }
      console.log('page111', JSON.stringify(bodyQuery));
      await vm.$store
        .dispatch("graphqlQuery", {
          query: `
            query search($token: String, $body: JSON, $db: String, $collection: String) {
              results: search(token: $token, body: $body, db: $db, collection: $collection )
            }
          `,
          variables: {
            body: bodyQuery,
            db: vm.db,
            collection: vm.collection,
          },
        })
        .then((response) => {
          if (
            response["results"] !== null &&
            response["results"] !== undefined
          ) {
            vm.dataResults = response["results"]["hits"]["hits"];
            vm.totalData = response["results"]["hits"]["total"]["value"];
            if (typeof vm.totalData === "object") {
              vm.totalData = vm.totalData["count"];
            }
            if (vm.totalData > vm.pagesize) {
              let floorPage = Math.floor(vm.totalData / vm.pagesize);
              if (vm.totalData % vm.pagesize > 0) {
                floorPage = floorPage + 1;
              }
              vm.pages = floorPage;
            } else {
              vm.currentPage = 1;
              vm.pages = 1;
            }
          } else {
            vm.dataResults = [];
            vm.currentPage = 1;
            vm.pages = 1;
            vm.totalData = 0;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      vm.loadingList = false;
      vm.$emit('pullData', {
        page: vm.currentPage,
        pages: vm.pages,
        totalData: vm.totalData,
        data: vm.dataResults
      });
    },
    isArray(item, key) {
      try {
        const data = item;
        return Array.isArray(eval("data." + key));
      } catch (error) {
        return false;
      }
    },
    isNotNull(item, key) {
      try {
        const data = item;
        let objectTmp = eval("data." + key);
        if (
          objectTmp === undefined ||
          objectTmp === null ||
          objectTmp === "" ||
          (Array.isArray(objectTmp) && objectTmp.length === 0)
        ) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        return false;
      }
    },
    dateViewYear(item, key, defaultVal) {
      try {
        const data = item;
        const datetime = eval("data." + key);
        if (
          datetime !== undefined &&
          datetime !== null &&
          String(datetime) !== "0"
        ) {
          return new Date(parseInt(datetime)).getFullYear();
        } else {
          return defaultVal;
        }
      } catch (error) {
        return defaultVal !== undefined && defaultVal !== null
          ? defaultVal
          : "";
      }
    },
    dateViewMonthYear(item, key, defaultVal) {
      try {
        const data = item;
        const datetime = eval("data." + key);
        if (
          datetime !== undefined &&
          datetime !== null &&
          String(datetime) !== "0"
        ) {
          return (
            new Date(parseInt(datetime)).getMonth() +
            1 +
            "/" +
            new Date(parseInt(datetime)).getFullYear()
          );
        } else {
          return defaultVal;
        }
      } catch (error) {
        return defaultVal !== undefined && defaultVal !== null
          ? defaultVal
          : "";
      }
    },
    dateView(item, key, defaultVal, dateFormat) {
      try {
        const data = item;
        const datetime = eval("data." + key);
        if (
          String(datetime) !== "0" &&
          datetime !== undefined &&
          datetime !== null
        ) {
          if (
            dateFormat === undefined ||
            dateFormat === null ||
            dateFormat === ""
          ) {
            dateFormat = "vi-VN";
          }
          if (new Date(parseInt(datetime)) == "Invalid Date") {
            return defaultVal;
          } else {
            return new Date(parseInt(datetime)).toLocaleDateString(dateFormat);
          }
        } else {
          return defaultVal;
        }
      } catch (error) {
        return defaultVal !== undefined && defaultVal !== null
          ? defaultVal
          : "";
      }
    },
    objectView(item, key, defaultVal) {
      try {
        const data = item;
        const result = eval("data." + key);
        console.log('resultresultresult', result, key, item);
        if (result === undefined || result === null) {
          return "";
        } else {
          return String(result).replace(/\n/g, "<br/>");
        }
      } catch (error) {
        return defaultVal !== undefined && defaultVal !== null
          ? defaultVal
          : "";
      }
    },
  },
};
</script>
