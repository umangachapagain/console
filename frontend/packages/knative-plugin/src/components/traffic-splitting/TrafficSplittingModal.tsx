import * as React from 'react';
import { FormikProps, FormikValues } from 'formik';
import {
  ModalTitle,
  ModalBody,
  ModalSubmitFooter,
} from '@console/internal/components/factory/modal';
import { TextInputTypes } from '@patternfly/react-core';
import {
  MultiColumnField,
  InputField,
  DropdownField,
} from '@console/dev-console/src/components/formik-fields';

export interface TrafficSplittingModalProps {
  revisionItems: any;
}

type Props = FormikProps<FormikValues> & TrafficSplittingModalProps;

const TrafficSplittingModal: React.FC<Props> = ({
  revisionItems,
  handleSubmit,
  handleReset,
  isSubmitting,
  status,
}) => {
  return (
    <form className="modal-content" onSubmit={handleSubmit}>
      <ModalTitle>Set Traffic Distribution</ModalTitle>
      <ModalBody>
        <p>Set traffic distribution for the Revisions of the Knative Service</p>
        <MultiColumnField
          name="trafficSplitting"
          addLabel="Add Revision"
          headers={['Split', 'Tag', 'Revision']}
          emptyValues={{ percent: '', tag: '', revisionName: '' }}
        >
          <InputField
            name="percent"
            type={TextInputTypes.number}
            placeholder="100"
            style={{ maxWidth: '100%' }}
            required
          />
          <InputField name="tag" type={TextInputTypes.text} placeholder="Unique Tag" required />
          <DropdownField
            name="revisionName"
            items={revisionItems}
            title="Select a revision"
            fullWidth
            required
          />
        </MultiColumnField>
      </ModalBody>
      <ModalSubmitFooter
        inProgress={isSubmitting}
        submitText="Save"
        cancel={handleReset}
        errorMessage={status.error}
      />
    </form>
  );
};

export default TrafficSplittingModal;
