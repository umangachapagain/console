import * as React from 'react';
import * as _ from 'lodash';
import {
  // Firehose,
  ScrollToTopOnMount,
  SectionHeading,
  StatusBox,
} from '@console/internal/components/utils';
import { getName, getUID } from '@console/shared/src';
import { getConfigAsJSON, getDescription, getType } from '../../selectors';
import { networkTypes } from '../../constants';
import { NetworkAttachmentDefinitionKind } from '../../types';

const NET_ATTACH_DEF_OVERVIEW_HEADING = 'Network Attachment Definition Overview';

export const prefixedID = (idPrefix: string, id: string) =>
  idPrefix && id ? `${idPrefix}-${id}` : null;

// FIXME: Use DetailsItem from common console utils.
export const DetailsItem: React.FC<DetailsItemProps> = ({
  title,
  isNotAvail = false,
  valueClassName,
  children,
}) => {
  return (
    <>
      <dt>{title}</dt>
      <dd className={valueClassName}>
        {isNotAvail ? <span className="text-secondary">Not available</span> : children}
      </dd>
    </>
  );
};

export const NetAttachDefinitionSummary: React.FC<NetAttachDefinitionSummaryProps> = ({
  netAttachDef,
}) => {
  const name = getName(netAttachDef);
  const description = getDescription(netAttachDef);
  const type = getType(getConfigAsJSON(netAttachDef));
  const id = getUID(netAttachDef);

  // FIXME: This should use ResourceSummary like all other details pages.
  return (
    <>
      <DetailsItem title="Name" idValue={prefixedID(id, 'name')} isNotAvail={!name}>
        {name}
      </DetailsItem>

      <DetailsItem
        title="Description"
        idValue={prefixedID(id, 'description')}
        isNotAvail={!description}
      >
        {description}
      </DetailsItem>

      <DetailsItem title="Type" idValue={prefixedID(id, 'type')} isNotAvail={!type}>
        {_.get(networkTypes, [type], null) || type}
      </DetailsItem>
    </>
  );
};

export const NetworkAttachmentDefinitionDetails: React.FC<NetAttachDefDetailsProps> = (props) => {
  const { obj: netAttachDef } = props;

  return (
    <StatusBox data={netAttachDef} loaded={!!netAttachDef}>
      <ScrollToTopOnMount />
      <div className="co-m-pane__body">
        <SectionHeading text={NET_ATTACH_DEF_OVERVIEW_HEADING} />
        <div className="row">
          <div className="col-sm-6">
            <NetAttachDefinitionSummary netAttachDef={netAttachDef} />
          </div>
        </div>
      </div>
    </StatusBox>
  );
};

type NetAttachDefinitionSummaryProps = {
  netAttachDef: NetworkAttachmentDefinitionKind;
};

type NetAttachDefDetailsProps = {
  obj: NetworkAttachmentDefinitionKind;
};

type DetailsItemProps = {
  title: string;
  idValue?: string;
  isNotAvail?: boolean;
  valueClassName?: string;
  children: React.ReactNode;
};

export default NetworkAttachmentDefinitionDetails;
