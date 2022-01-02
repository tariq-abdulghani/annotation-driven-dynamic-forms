import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface SelectorsDescription {
  level: string;
  data: any[];
  labelField: string;
  valueField: string;
  selectedElement: any | null;
  outputField: string;
}

type Branch = {
  [x: string]: any | any[];
};
type TreeArray = Branch[];

@Component({
  selector: 'app-tree-selector',
  templateUrl: './tree-selector.component.html',
  styleUrls: ['./tree-selector.component.css'],
})
export class TreeSelectorComponent implements OnInit {
  selectorsDescription: SelectorsDescription[] = [
    {
      level: 'country',
      data: [],
      labelField: 'country',
      valueField: 'country',
      selectedElement: null,
      outputField: 'country',
    },
    {
      level: 'cities',
      data: [],
      labelField: 'code',
      valueField: 'code',
      selectedElement: null,
      outputField: 'city',
    },
    {
      level: 'streets',
      data: [],
      labelField: 'name',
      valueField: 'name',
      selectedElement: null,
      outputField: 'street',
    },
  ];

  dataTreeArray: TreeArray = [
    {
      country: 'co1',
      cities: [
        {
          code: 'cit-11',
          streets: [
            { name: 'str8', description: 'wow!!' },
            { name: 'str88', description: 'wow!!' },
            { name: 'str888', description: 'wow!!' },
          ],
        },
        { code: 'cit-12', streets: [{ name: 'str9', description: 'wow!!' }] },
      ],
    },
    {
      country: 'co2',
      cities: [
        { code: 'cit-21', streets: [{ name: 'str82', description: 'wow!!' }] },
        { code: 'cit-22', streets: [{ name: 'str92', description: 'wow!!' }] },
      ],
    },
    {
      country: 'co3',
      cities: [
        { code: 'cit-31', streets: [{ name: 'str83', description: 'wow!!' }] },
        { code: 'cit-32', streets: [{ name: 'str93', description: 'wow!!' }] },
      ],
    },
  ];

  /**
   * Works with array based tree impl data structures which
   * that are desired to be represented as select elements that reflects tha relation
   * examples : address info like city and country they are related
   *
   * @param http
   */
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initialSelection();
    console.log(this.selectors, this.selectorsDescription);
  }

  selectors: any = [];
  initialSelection() {
    this.selectorsDescription.forEach((sd, index) => {
      if (index == 0) {
        this.selectors[index] = this.dataTreeArray;
        this.selectorsDescription[index].data = this.dataTreeArray;

        this.selectorsDescription[index].selectedElement =
          this.selectorsDescription[index].data[0];
      } else {
        console.log('n-1', this.selectors[index - 1]);
        this.selectors[index] = this.selectors[index - 1][0][sd.level];

        this.selectorsDescription[index].data =
          this.selectorsDescription[index - 1].data[0][sd.level];

        this.selectorsDescription[index].selectedElement =
          this.selectorsDescription[index].data[0];
      }
    });
  }
  propagateSelection(levelIndex: number, value?: any) {
    // console.log(levelIndex);

    let selected = this.selectorsDescription[levelIndex].data.find(
      (el: any) => el[this.selectorsDescription[levelIndex].valueField] == value
    )!;
    this.selectorsDescription[levelIndex].selectedElement = selected;

    if (selected == undefined) {
      this.selectorsDescription[levelIndex].selectedElement =
        this.selectorsDescription[levelIndex].data[0];
    }
    // last element case
    if (levelIndex == this.selectorsDescription.length - 1) {
      return;
    } else {
      let nextNodeData = // @ts-ignore
        this.selectorsDescription[levelIndex].selectedElement[
          this.selectorsDescription[levelIndex + 1].level // gets the data array of next selector from the current selected element
        ];
      this.selectorsDescription[levelIndex + 1].data = nextNodeData;
      this.propagateSelection(levelIndex + 1, value);
    }
  }

  composeOutput() {
    const output: { [x: string]: any } = {};

    this.selectorsDescription.forEach((sd, index) => {
      output[sd.outputField] = sd.selectedElement[sd.labelField];
    });

    return output;
  }

  get value() {
    return this.composeOutput();
  }
}
