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
      { key: 'csa', label: 'より線(総断面積)', type: 'blank', unit: 'mm²' },
      { key: 'amp_stranded', label: '許容電流', type: 'blank', unit: 'A' }
    ],
    rows: [
      { diameter: '1.6mm', amp_solid: '27', csa: '2', amp_stranded: '27' },
      { diameter: '2.0mm', amp_solid: '35', csa: '3.5', amp_stranded: '37' },
      { diameter: '2.6mm', amp_solid: '48', csa: '5.5', amp_stranded: '49' },
      { diameter: '3.2mm', amp_solid: '62', csa: '8', amp_stranded: '61' }
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
