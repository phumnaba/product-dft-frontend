/********************************************************************************
 * Copyright (c) 2021,2022 FEV Consulting GmbH
 * Copyright (c) 2021,2022 T-Systems International GmbH
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { DynamicTableColumn } from '../models/DynamicTableColumn';
import * as Countries from './Countries';
import { commonColumns } from './CommonColumns';

function getObject(
  field: string,
  headerName: string,
  headerAlign: string,
  type?: string,
  valueOptions?: { value: string; label: string }[],
) {
  return { field, headerName, editable: true, sortable: false, flex: 1, type, headerAlign, valueOptions };
}

export function getColumnsBySubmodelType(type: string) {
  const commonSubmodelColumns: DynamicTableColumn[] = commonColumns;
  const filteredColumns: DynamicTableColumn[] =
    type === 'batch'
      ? commonSubmodelColumns.filter((column: DynamicTableColumn) => column.field !== 'part_instance_id')
      : commonSubmodelColumns.filter((column: DynamicTableColumn) => column.field !== 'batch_id');
  const auxArray = JSON.parse(JSON.stringify(filteredColumns));

  auxArray.push(
    getObject('manufacturing_date', 'Manufacturing Date*', 'center', 'date'),
    getObject('manufacturing_country', 'Manufacturing Country', 'center', 'singleSelect', Countries.list),
    getObject('manufacturer_part_id', 'Manufacturer Part ID*', 'center'),
    getObject('customer_part_id', 'Customer Part ID', 'center'),
    getObject('classification', 'Classification*', 'center'),
    getObject('name_at_manufacturer', 'Name at Manufacturer*', 'center'),
    getObject('name_at_customer', 'Name at customer', 'center'),
  );

  return auxArray;
}
