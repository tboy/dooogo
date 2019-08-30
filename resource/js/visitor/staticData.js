var  staticData = {
  education:[
    {name:'博士',value:'DOCTOR'},
    {name:'硕士',value:'MASTER'},
    {name:'本科',value:'BACHELOR'},
    {name:'专科',value:'JUNIOR_COLLEGE'},
    {name:'高中',value:'SENIOR'},
    {name:'初中',value:'JUNIOR'},
    {name:'小学',value:'PRIMARY'}
  ],
  marryStatus:[
    {name:'单身',value:'SINGLE',parent_name:''},
    {name:'恋爱',value:'IN_LOVE',parent_name:''},
    {name:'新婚',value:'NEWLY_MARRIED',parent_name:''},
    {name:'已婚',value:'MARRIED',parent_name:''},
    {name:'育儿（孩子0-3 周岁）',value:'PARENTING',parent_name:''},
    {name:'育儿（孕育中）',value:'PARENTING_0',parent_name:'育儿（孩子0-3 周岁）'},
    {name:'育儿（宝宝 0-6 个月）',value:'PARENTING_0_6',parent_name:'育儿（孩子0-3 周岁）'},
    {name:'育儿（宝宝 6-12 个月',value:'PARENTING_6_12',parent_name:'育儿（孩子0-3 周岁）'},
    {name:'育儿（宝宝 1-2 岁）',value:'PARENTING_12_24',parent_name:'育儿（孩子0-3 周岁）'},
    {name:'育儿（宝宝 2-3 岁）',value:'PARENTING_24_36',parent_name:'育儿（孩子0-3 周岁）'},
    {name:'育儿（孩子 3-6 周岁）',value:'CHILD_PRE_SCHOOL',parent_name:''},
    {name:'育儿（孩子 6-12 周岁）',value:'CHILD_PRIMARY_SCHOOL',parent_name:''},
    {name:'育儿（孩子 12-15 周岁）',value:'CHILD_JUNIOR_SCHOOL',parent_name:''},
    {name:'育儿（孩子 15-18 周岁）',value:'CHILD_HIGH_SCHOOL',parent_name:''}
  ],
  consumption:[
    {name:'高消费',value:'HIGH'},
    {name:'低消费',value:'LOW'}
  ],
  remarketing:[
    {name:'已关注你的公众号',value:'1'},
    {name:'曾领取你的微信卡券',value:'2'},
    {name:'曾对你的微信广告感兴趣',value:'3'}
  ],
  housePrice:[
    {name:'小于1000元/㎡',value:'0'},
    {name:'1000元/㎡',value:'1'},
    {name:'2000元/㎡',value:'2'},
    {name:'3000元/㎡',value:'3'},
    {name:'4000元/㎡',value:'4'},
    {name:'5000元/㎡',value:'5'},
    {name:'6000元/㎡',value:'6'},
    {name:'7000元/㎡',value:'7'},
    {name:'8000元/㎡',value:'8'},
    {name:'9000元/㎡',value:'9'},
    {name:'10000元/㎡',value:'10'},
    {name:'20000元/㎡',value:'20'},
    {name:'30000元/㎡',value:'30'},
    {name:'40000元/㎡',value:'40'},
    {name:'50000元/㎡',value:'50'},
    {name:'60000元/㎡',value:'60'},
    {name:'70000元/㎡',value:'70'},
    {name:'80000元/㎡',value:'80'},
    {name:'90000元/㎡',value:'90'},
    {name:'100000元/㎡',value:'100'},
    {name:'大于100000元/㎡',value:'110'},
  ],
  marryStatus1:[
    { name:'单身',
      value:'SINGLE',
      
      children:[
        {name:'单身1',value:'1',checked:false},
        {name:'单身2',value:'2',checked:false},
        {name:'单身3',value:'3',checked:false}
      ]
    },
    {name:'新婚',value:'IN_LOVE',
      children:[
        {name:'新婚1',value:'1',checked:false},
        {name:'新婚2',value:'2',checked:false},
        {name:'新婚3',value:'3',checked:false,
          children:[
            {name:'育儿（孕育中）',value:'PARENTING_0',checked:false},
            {name:'育儿（宝宝 0-6 个月）',value:'PARENTING_0_6',checked:false},
            {name:'育儿（宝宝 6-12 个月',value:'PARENTING_6_12',checked:false},
            {name:'育儿（宝宝 1-2 岁）',value:'PARENTING_12_24',checked:false},
            {name:'育儿（宝宝 2-3 岁）',value:'PARENTING_24_36',checked:false},
          ]
        }
      ]
    },
    {name:'新婚',value:'NEWLY_MARRIED'},
    {name:'已婚',value:'MARRIED'},
    {name:'育儿',value:'PARENTING'},
    {name:'育儿（孕育中）',value:'PARENTING_0'},
    {name:'育儿（宝宝 0-6 个月）',value:'PARENTING_0_6'},
    {name:'育儿（宝宝 6-12 个月',value:'PARENTING_6_12'},
    {name:'育儿（宝宝 1-2 岁）',value:'PARENTING_12_24'},
    {name:'育儿（宝宝 2-3 岁）',value:'PARENTING_24_36'},
    {name:'育儿（孩子 3-6 周岁）',value:'CHILD_PRE_SCHOOL'},
    {name:'育儿（孩子 6-12 周岁）',value:'CHILD_PRIMARY_SCHOOL'},
    {name:'育儿（孩子 12-15 周岁）',value:'CHILD_JUNIOR_SCHOOL'},
    {name:'育儿（孩子 15-18 周岁）',value:'CHILD_HIGH_SCHOOL'}
  ],
}
