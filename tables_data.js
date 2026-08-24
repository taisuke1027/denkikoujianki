window.DEFAULT_TABLES_VERSION = 1; // tables_data.js を更新するたびに、この数値を1つ増やしてください

/* =========================================================================
   表で暗記(穴埋めクイズ)用データ
   -------------------------------------------------------------------------
   カード形式(cards_data.js)とは別に、表形式でまとめて覚えたい内容を
   ここに登録する。表を追加したいときは、この配列に同じ形式で
   オブジェクトを1つ追加するだけでよい(画面側の実装変更は不要)。

   1テーブルの形式:
   {
     id:       一意のID('t0001' など)
     title:    画面上部に表示するタイトル
     category: 一覧画面に出す分類ラベル(任意)
     note:     表の上に出す補足説明(任意)
     columns:  列の定義。配列の並び順がそのまま表の列順になる。
       - key:   行データ(rows)内のプロパティ名
       - label: 見出しに表示する文字列
       - type:  'fixed' = 常に表示される列(暗記済みの手がかり)
                'blank' = 数値入力で回答させる列
       - unit:  blank列のときに入力欄の横に表示する単位(任意)
     rows:     1行が1レコード。各列の key に対応する値(文字列)を持つ。
               blank列の値は「正解の数値」を文字列で入れる(例: "3.5")。
   }
--------------------------------------------------------------------------*/
window.DEFAULT_TABLES = [
  {
    id: 't0001',
    title: 'ビニル絶縁電線の許容電流値',
    category: '電線・許容電流',
    note: '単線の直径・より線の総断面積から、許容電流の数値を覚えましょう。',
    columns: [
      { key: 'diameter', label: '単線(直径)', type: 'fixed' },
      { key: 'amp_solid', label: '許容電流', type: 'blank', unit: 'A' },
      { key: 'csa', label: 'より線(総断面積)', type: 'fixed' },
      { key: 'amp_stranded', label: '許容電流', type: 'blank', unit: 'A' }
    ],
    rows: [
      { diameter: '1.6mm', amp_solid: '27', csa: '2mm²', amp_stranded: '27' },
      { diameter: '2.0mm', amp_solid: '35', csa: '3.5mm²', amp_stranded: '37' },
      { diameter: '2.6mm', amp_solid: '48', csa: '5.5mm²', amp_stranded: '49' },
      { diameter: '3.2mm', amp_solid: '62', csa: '8mm²', amp_stranded: '61' }
    ]
  },

  {
    id: 't0002',
    title: '低圧電路の絶縁抵抗値',
    category: '絶縁抵抗値',
    note: '使用電圧の区分と、対応する絶縁抵抗値の数値を覚えましょう。',
    columns: [
      // type:'template': 文言と入力欄を配列で並べる(例: [{v:'300'}, 'V以下'])
      // type:'mixed'   : 行ごとに { type:'blank', value:'…' } か { type:'fixed', text:'…' } を切り替え
      { key: 'voltage', label: '電路の使用電圧', type: 'template', width: '20%' },
      { key: 'sub', label: '対地電圧など', type: 'mixed', unit: 'V以下', width: '22%' },
      { key: 'applies', label: '該当する配線方式', type: 'fixed', width: '36%' },
      { key: 'insulation', label: '絶縁抵抗値', type: 'blank', unit: 'MΩ以上', width: '22%' }
    ],
    rows: [
      {
        // _rowSpan で「電路の使用電圧」列を2行分まとめて1つの入力欄にする
        // (元の表で「300V以下」のセルが2行にまたがっているのを再現)
        _rowSpan: { voltage: 2 },
        voltage: [ {v:'300'}, 'V以下' ],
        sub: { type: 'blank', value: '150' },
        applies: '単相2線式100V、単相3線式100/200Vが該当',
        insulation: '0.1'
      },
      {
        // voltage 列はこの行では描画されない(1つ上の行の rowSpan に含まれる)
        sub: { type: 'fixed', text: 'その他の場合' },
        applies: '三相3線式200Vが該当',
        insulation: '0.2'
      },
      {
        voltage: [ {v:'300'}, 'Vを超えるもの' ],
        sub: { type: 'fixed', text: '—' },
        applies: '三相4線式400Vが該当',
        insulation: '0.4'
      }
    ]
  },

  {
    id: 't0003',
    title: 'コンセントと配線用遮断器',
    category: '配線器具',
    note: '配線用遮断器の定格電流をもとに、コンセントの定格電流の範囲と電線の太さを覚えましょう。',
    columns: [
      { key: 'breaker', label: '配線用遮断器の定格電流', type: 'fixed', width: '26%' },
      // type:'template' の列は、row[key] に文字列(固定文言)と
      // {v:'正解の数値'}(入力欄)を順番に並べた配列を指定することで、
      // 1つのセルの中に複数の入力欄と文言を混在させられる。
      { key: 'outlet', label: 'コンセントの定格電流', type: 'template', width: '37%' },
      { key: 'wire', label: '電線の太さ', type: 'template', width: '37%' }
    ],
    rows: [
      {
        breaker: '20A',
        outlet: [ {v:'20'}, 'A以下' ],
        wire: [ {v:'1.6'}, 'mm以上' ]
      },
      {
        breaker: '30A',
        outlet: [ {v:'20'}, 'A以上〜', {v:'30'}, 'A以下' ],
        wire: [ {v:'2.6'}, 'mm(', {v:'5.5'}, 'mm²)以上' ]
      },
      {
        breaker: '40A',
        outlet: [ {v:'30'}, 'A以上〜', {v:'40'}, 'A以下' ],
        wire: [ {v:'8'}, 'mm²' ]
      },
      {
        breaker: '50A',
        outlet: [ {v:'40'}, 'A以上〜', {v:'50'}, 'A以下' ],
        wire: [ {v:'14'}, 'mm²' ]
      }
    ]
  }

  /* 追加例:
  {
    id: 't0002',
    title: '別の暗記表のタイトル',
    category: '任意のカテゴリ名',
    columns: [
      { key: 'colA', label: '固定列の見出し', type: 'fixed' },
      { key: 'colB', label: '穴埋め列の見出し', type: 'blank', unit: '単位' }
    ],
    rows: [
      { colA: '固定値1', colB: '10' },
      { colA: '固定値2', colB: '20' }
    ]
  }
  */
];
