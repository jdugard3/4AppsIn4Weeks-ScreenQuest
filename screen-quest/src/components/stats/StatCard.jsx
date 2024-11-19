/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';

const StatCard = ({ icon, label, value, subValue, variant = "default" }) => {
  return (
    <Card variant={variant}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium text-text-secondary">{label}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold">{value}</span>
            {subValue && (
              <Badge variant={variant} size="sm" className="mt-1">
                {subValue}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

StatCard.propTypes = {
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    subValue: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'primary', 'secondary'])
  };

StatCard.defaultProps = {
    variant: 'default',
    subValue: null
};
export default StatCard;