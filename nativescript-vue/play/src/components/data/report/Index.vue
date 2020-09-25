<template>
  <StackLayout height="0">
  </StackLayout>
</template>

<script>
export default {
  props: {
    query: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    let vm = this;
    vm.$nextTick(async function () {
      await vm.clean();
      await vm.init();
    });
  },
  methods: {
    async clean() {},
    async init() {
      let vm = this;
      let aggsQuery = `
        query search($token: String, 
    `;
      let variables = {};
      let aggsQueryBody = ` `;
      let objectReport = {};
      for (let queryEl of vm.query) {
        let keyName = Object.keys(queryEl)[0];
        let publicData = "false";
        if (queryEl[keyName]["publicData"]) {
          publicData = String(queryEl[keyName]["publicData"]);
        }
        aggsQuery =
          aggsQuery +
          " $body" +
          keyName +
          ": JSON, $db" +
          keyName +
          ": String, $collection" +
          keyName +
          ": String";
        if (queryEl[keyName]["type"] === "data") {
          aggsQueryBody =
            aggsQueryBody +
            " " +
            keyName +
            ": search(token: $token, body: $body" +
            keyName +
            ", db: $db" +
            keyName +
            ", collection: $collection" +
            keyName +
            " ), ";
        } else {
          aggsQueryBody =
            aggsQueryBody +
            " " +
            keyName +
            ": aggs(token: $token, body: $body" +
            keyName +
            ", db: $db" +
            keyName +
            ", collection: $collection" +
            keyName +
            ', publicData: "' +
            publicData +
            '" ), ';
        }
        if (queryEl[keyName]["report"]) {
          objectReport[keyName] = true;
        } else {
          objectReport[keyName] = false;
        }
        variables["body" + keyName + ""] = queryEl[keyName]["body"];
        variables["db" + keyName + ""] = queryEl[keyName]["db"];
        variables["collection" + keyName + ""] = queryEl[keyName]["collection"];
      }
      aggsQuery = aggsQuery + ` ){ ` + aggsQueryBody + ` } `;
      await vm.$store
        .dispatch("graphqlQuery", {
          query: aggsQuery,
          variables: variables
        })
        .then(data => {
          let objectUnknown = {};
          for (let key in data) {
            if (objectReport[key]) {
              if (
                data[key]["aggregations"] !== undefined &&
                data[key]["aggregations"] !== null &&
                data[key]["aggregations"]["report"] !== undefined &&
                data[key]["aggregations"]["report"] !== null &&
                data[key]["aggregations"]["report"]["aggregations"] !==
                  undefined &&
                data[key]["aggregations"]["report"]["aggregations"] !== null &&
                data[key]["aggregations"]["report"]["aggregations"][
                  "buckets"
                ] !== undefined &&
                data[key]["aggregations"]["report"]["aggregations"][
                  "buckets"
                ] !== null
              ) {
                let totalAggs =
                  data[key]["aggregations"]["report"]["doc_count"];
                let objectMapping = {};
                let totalAggsEl = 0;
                for (let el of data[key]["aggregations"]["report"][
                  "aggregations"
                ]["buckets"]) {
                  if (Object.prototype.hasOwnProperty.call(el, "ext")) {
                    objectMapping[el["key"]] = el["ext"]["value"];
                  } else {
                    objectMapping[el["key"]] = el["doc_count"];
                  }
                  totalAggsEl = totalAggsEl + el["doc_count"];
                }
                objectUnknown[key] = totalAggs - totalAggsEl;
                data[key] = objectMapping;
              }
            }
          }
          vm.$emit("report-unknown", objectUnknown);
          vm.$emit("report", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>
