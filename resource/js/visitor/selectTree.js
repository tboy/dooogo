var selectTreeTemplate = 
`<div class="select-tree-module">
    <div class="total-select">已选择 {{selectData.length}}/50</div>
    <div class="select-tree-content">
      <div class="tree-unit" v-for="(item,idx) in selectData" :key="idx">
        {{item.name}}
        <a href="javascript:;" @click="delSelectTree(item,idx)">删除</a>
      </div>
    </div>
    <div class="search-module" v-if="showsearch">
      <el-input :placeholder="palceholder"></el-input>
      <el-button size="small">搜索</el-button>
    </div>
    <div class="select-tree-compoent">
      <template v-for="(column, key) in treeColumnArr">
        <div class="tree-view">
          <ul>
            <template v-for="(item, idx) in column">
              <li :key="idx" @click="showTree(item.name, item.level)">
                <el-checkbox
                  :value="item.checked"
                  :indeterminate ="item.indeterminate"
                  @change="onChangeSelect(item)"
                ></el-checkbox>
                {{item.name}}
              </li>
            </template>
          </ul>
        </div>
      </template>
    </div>
</div> `;


Vue.component('select-tree', {
  data () {
    return {
      treeDataArr: this.data,
      selectData: [],
      treeColumnArr: []
    }
  },
  props: {
    data: { type: Array },
    propname: { type: String },
    palceholder: { type: String },
    showsearch: {
      type: Boolean,
      default: false
    },
  },
  template: selectTreeTemplate,
  mounted () {
    /* 有效字段: level name parent_name */
    this.createLevel('', 0);
    this.showTree('', 0);
  },
  watch: {
    selectData (val) {
      this.$emit('change', this.propname, val);
    }
  },
  methods:{
    /* 递归生成级别level */
    createLevel (parent_name, level) {
      const column = []
      /* 生成对应parent_name的数组，列数据 */
      for(let item of this.treeDataArr){
        if(item.parent_name === parent_name){
          /* 初始化级别、未全选状态、checked */
          item.level = level;
          item.checked = false;
          item.indeterminate = false;
          column.push(item);
        }
      };
      if(column.length){
        column.forEach(item => {
          this.createLevel(item.name, level + 1)
        })
      }
      /*console.log('treeDataArr-', this.treeDataArr);*/
    },
    showTree (parent_name, parent_level) {
      /* 获取符合条件的下级选项数组 */
      const result = this.treeDataArr.filter(item => item.parent_name === parent_name);
      if(result.length){
        /* level: 该级别等级 */
        const level = result[0].level;
        this.treeColumnArr[level] = result;
        /* 递归生成下级选项数组 */
        this.showTree(result[0].name, level);
      } else {
        /* 无下级选项，下级设置为空 */
        this.treeColumnArr[parent_level + 1] = [];
      }
      this.treeColumnArr = this.treeColumnArr.slice(0);
      /*console.log('treeColumnData-', this.treeColumnArr);*/
      
      // else {
      //   const current = this.treeDataArr.filter(item => {
      //     return item.name === parent_name
      //   })[0]
      //   this.treeColumnArr = this.treeColumnArr.slice(0)
      // }
    },
    changeTreeSelect2 (item) {
      console.log(item);
      this.showTree(item.name)
      const level = item.level
      item.checked = !item.checked
      item.indeterminate = false
      let offset = 1
      while(this.treeColumnArr[level + offset]) {
        this.treeColumnArr[level + offset].forEach( i => {
          i.checked = item.checked
          if(i.checked){
            i.indeterminate = false
          }
        })
        offset++
      }
      // return;
      this.treeDataArr.forEach(i => {
        if(i.parent_name == item.name){
          i.checked = item.checked
        }
      })
      this.existParentCheck(item);
      // if(item.level > 0){

      this.getExitCheckedTree();
      // 全部勾选数据用getExitCheckedTree2，吧getExitCheckedTree注释掉
      // this.getExitCheckedTree2();
    },
    onChangeSelect (item) {
      const { level, name, parent_name } = item;
      /* 更改checked状态 */
      item.checked = !item.checked;
      this.changeOnLevelStatus(parent_name);
      this.changeLowerLevelStatus(name, item.checked);
      this.addLabel();
    },
    /* 改变上级状态 */
    changeOnLevelStatus (parent_name) {
      if (parent_name === '') return false;
      /*console.log('parent_name', parent_name);*/
      /* 获取相同父元素的同级数组 */
      const sameLevelList = this.treeDataArr.filter(item => item.parent_name === parent_name);
      console.log(sameLevelList);
      /* 同级元素全部勾选 */
      const checkedAll = sameLevelList.filter(item => item.checked === true).length === sameLevelList.length;
      /* 同级元素全部未勾选 */
      const notCheckedAll = sameLevelList.filter(item => item.checked === false).length === sameLevelList.length;
      /* 同级元素存在下级选项未全部勾选 */
      const lowerNotCheckedAll = sameLevelList.filter(item => item.indeterminate === true).length > 0;
      /*console.log(checkedAll, notCheckedAll, lowerNotCheckedAll);*/
      /* 获取上级元素 */
      const parent = this.treeDataArr.find(item => item.name === parent_name);
      /*console.log('parent-', parent);*/
      if (checkedAll) {
        parent.checked = true;
        parent.indeterminate = false;
      } else if (notCheckedAll) {
        if (lowerNotCheckedAll) {
          parent.checked = false;
          parent.indeterminate = true;
        } else {
          parent.checked = false;
          parent.indeterminate = false;
        }
      } else {
        parent.checked = false;
        parent.indeterminate = true;
      }
      this.treeDataArr.map(item => {
        if (item.name === parent_name) item = parent;
      });
      /* 递归调用 */
      this.changeOnLevelStatus(parent.parent_name);
    },
    /* 改变下级状态 */
    changeLowerLevelStatus (name, status) {
      /* 获取下级选项组成的数组 */
      const lowerLevelList = this.treeDataArr.filter(item => item.parent_name === name);
      /*console.log(lowerLevelList);*/
      /* 更改下级元素状态 */
      if (lowerLevelList.length === 0) return false;
      if (status) {
        this.treeDataArr.map(item => {
          if (item.parent_name === name) {
            item.checked = true;
            this.changeLowerLevelStatus(item.name, item.checked);
          }
        });
      } else {
        this.treeDataArr.map(item => {
          if (item.parent_name === name) {
            item.checked = false;
            this.changeLowerLevelStatus(item.name, item.checked);
          }
        });
      }
    },
    /* 添加标签 */
    addLabel () {
      const selectData = [];
      /* 筛选所有根级目录全选的元素列表 */
      const firstColumnCheckedAll = this.treeColumnArr[0].filter(item => item.checked === true);
      selectData.push(...firstColumnCheckedAll);
      /*console.log('firstColumnCheckedAll-', firstColumnCheckedAll);*/
      let firstColumnNotCheckedAll = this.treeColumnArr[0].filter(item => item.indeterminate === true);
      /*console.log('firstColumnNotCheckedAll', firstColumnNotCheckedAll);*/
      while (firstColumnNotCheckedAll.length !== 0) {
        const temp = firstColumnNotCheckedAll[0];
        const list = this.treeDataArr.filter(item => item.parent_name === temp.name);
        /*console.log('list', list);*/
        const checkedAll = list.filter(item => item.checked === true);
        const notCheckedAll = list.filter(item => item.indeterminate === true);
        selectData.push(...checkedAll);
        firstColumnNotCheckedAll.shift();
        firstColumnNotCheckedAll.push(...notCheckedAll);
      }
      this.selectData = selectData;
      console.log('selectData', selectData);
    },
    existParentCheck(item){
      if (item.level > 0) {
        /** 选出父级 */
        const current = this.treeDataArr.filter(i => {
          return i.name === item.parent_name
        })[0]
        console.log(current, this.treeColumnArr);
        /** 有同级未被选择为true */
        const existNoCheckedChild = this.treeColumnArr[item.level].filter(i => {
          return !i.checked
        }).length > 0
        console.log(existNoCheckedChild);
        /** 同级全部未选择为false */
        const existCheckedChild = this.treeColumnArr[item.level].filter(i => {
          return i.checked
        }).length > 0
        console.log(existCheckedChild);
        const existIndeterminateChild = this.treeColumnArr[item.level].filter(i => {
          return i.indeterminate
        }).length > 0
        console.log(existIndeterminateChild);

        // 子级全未选
        if(existNoCheckedChild && !existCheckedChild){
          current.checked = false
          current.indeterminate = false
          if(existIndeterminateChild){
            current.indeterminate = true
          }

          console.log('子级全未选')
        }
        // 子级全选
        if(!existNoCheckedChild && existCheckedChild){
          current.checked = true
          current.indeterminate = false
          console.log('子级全选')
        }
        // 子级已未选都存在
        if(existNoCheckedChild && existCheckedChild){
          current.checked = false
          current.indeterminate = true
          console.log('子级已未选都存在')
        }


        this.existParentCheck(current);
      }

    },
    getExitCheckedTree(){
      let existCheckedChild = [];
      let firstCheckedChild = [];
      let concatTreeForOne = [].concat.apply([], this.treeColumnArr);
      let count = 0;

      existCheckedChild = concatTreeForOne.filter(i => {
        if(i.level > 0){
          return i.checked && !i.indeterminate
        }
      })
      firstCheckedChild = this.treeColumnArr[0].filter(j => {
        if(j.indeterminate){
          count++;
        }
        return j.checked && !j.indeterminate;
      })
      console.log(existCheckedChild, firstCheckedChild)
      // console.log(count)
      if(count){
        this.selectData = [].concat(firstCheckedChild,existCheckedChild);
      }else{
        this.selectData = firstCheckedChild;
      }

    },
    getExitCheckedTree2(){
      let arr = [],arr1=[];
      const hasCheckedChild = this.treeDataArr.filter(i => {
        return i.checked;
      });
      this.selectData = hasCheckedChild;
      return;
      for(let i of this.treeDataArr){
        if(i.level == 0 && i.checked){
          arr.push(i)
        }else{
          let current = this.treeDataArr.filter(j => {
            return j.name === i.parent_name
          })[0]
          console.log(current)
          if(current.checked && i.checked){
            arr.push(i)
          }
        }
      }

    },
    // 删除节点
    delSelectTree(item, idx){
      this.selectData.splice(idx, 1);
      this.onChangeSelect(item);
    }
  }
})