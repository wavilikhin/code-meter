import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Collapsable from 'src/shared/components/Collapsable';
import { styled } from '@mui/material';
import { Accordion } from '@genesis/ui-kit';
import { setProductQty } from 'src/store/slices/products';
import { useAppDispatch } from 'src/shared/hooks/redux';
import { RootState } from 'src/store';
import { useAppSelector } from 'src/shared/hooks/redux';
import { selectProductsSlice } from 'src/store/slices/products/selectors';
import { selectStoreSlice } from 'src/store/slices/store/selectors';
import { selectDeliveryMethodSlice } from 'src/store/slices/deliveryMethod/selectors';
import { getDeliveryMethods } from 'src/store/slices/deliveryMethod/thunks';
import { setZipCode } from 'src/store/slices/store';
import { ASSEMBLY_REQUIRED, DIMENSION_ATTR_NAME, DIVISION_MACYS } from 'src/shared/constants/en-ui/pdp';
import ProductComponentsSkus from 'src/pages/PDP/components/ProductComponentsSkus';
import ProductDynamicAttributes from 'src/shared/components/ProductDynamicAttributes';
import ProductQuanity from 'src/shared/components/ProductQuantity';
import Schematics from 'pages/PDP/components/Schematics';
import DotComProductLink from 'pages/PDP/components/DotComProductLink';
import ProductDeptAndName from 'src/shared/components/ProductDeptAndName';
import ProductZipcode from 'pages/PDP/components/ProductZipcode';
import ProductDeliveryMethods from 'pages/PDP/components/ProductDeliveryMethods';
import ProductDescription from 'pages/PDP/components/ProductDescription';
import ProductDimensions from 'pages/PDP/components/ProductDimensions';
import ProductSkuDetails from 'src/pages/PDP/components/ProductSkuDetails';
import ProductUids from 'src/pages/PDP/components/ProductUids';
import ProductAvailabilityDetails from 'pages/PDP/components/AvailabilityDetails';
import ProductPrices from 'src/pages/PDP/components/ProductPrices';
import { VEIW_ALL_SKUS, COLLAPSE_ALL_SKUS } from 'src/shared/constants/en-ui/productComponentsSkus';

const VerticalGridContainer = styled(Grid)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const MarginBothGridContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ProductQuanityWrapper = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
}));

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { currentProduct, productQty } = useAppSelector(selectProductsSlice);
  const { mcomLink, bcomLink, macysSchematicLink, blmSchematicLink } = useSelector((state: RootState) => state.config);
  const { zipCode, storeNumber, divisionId } = useAppSelector(selectStoreSlice);
  const { isLoading: isDeliveryMethodsLoading, deliveryMethods = [] } = useAppSelector(selectDeliveryMethodSlice);
  const {
    productClassification,
    productName,
    upcNumber,
    webId,
    bigTicketGroupUpcType,
    orderGroup,
    skuId,
    skuName,
    productComponents = [],
    productPrice = [],
    productLevelVariation = { colormap: [] },
    productUpcs = [],
    isCustomerAssemblyRequired,
    productDynamicAttributes = { COLOR: [], TYPE: [], SIZE: [] },
    dotComUrl,
    vendorStyle,
    billingPlans,
  } = currentProduct;
  const { colormap } = productLevelVariation || {};
  const { department, vendor } = productClassification || {};
  const { departmentId, departmentName } = department || {};
  const { vendorId, vendorName } = vendor || {};
  const { COLOR, TYPE, SIZE } = productDynamicAttributes || { COLOR: [], TYPE: [], SIZE: [] };
  const productUrl = dotComUrl?.productUrl || null;
  const dotComPrice = currentProduct?.mcomPrice?.[0];
  const isWnmEligible = currentProduct?.protectionPlan?.eligible;
  const { originalPrice, retailPrice } = productPrice?.[0] || {};
  const departmentIdForDeliveryMethod = departmentId?.toString();
  const productIdForDeliveryMethod = skuId || webId;
  // This will be refactored once API is ready and util function added for empty array
  const productAvailabledetails =
    productComponents && productComponents.length > 0 ? productComponents : [{ upcName: currentProduct?.skuName }];
  const productDimensionData = currentProduct?.dynamic?.attributes?.find(
    (attr: any) => attr.name === DIMENSION_ATTR_NAME
  )?.attributeValues;
  const onZipCodeSubmit = useCallback((input: string) => {
    dispatch(setZipCode(input));
    dispatch(
      getDeliveryMethods({
        zipcode: input,
        division: divisionId,
        storeNumber,
        products: [
          {
            deptNo: departmentIdForDeliveryMethod,
            itemQty: productQty,
            productId: productIdForDeliveryMethod,
            saleRetailPrice: retailPrice,
          },
        ],
      })
    );
  }, []);
  const onProductQuantityChange = useCallback((qty: number) => {
    dispatch(setProductQty(qty));
  }, []);
  const isWithDynamicAttribues = !!(!!COLOR?.length || !!TYPE?.length || !!SIZE?.length || !!colormap?.length);
  const productDescriptionValues = currentProduct?.dynamic?.attributes?.find(
    (attr: any) => attr.name === 'BULLET_TEXT'
  )?.attributeValues;
  const productLongDesc = currentProduct?.dynamic?.attributes?.find(
    (attr: any) => attr.name === 'PRODUCT_LONG_DESCRIPTION'
  )?.attributeValues?.[0];

  return (
    <Grid container>
      <ProductDeptAndName departmentId={departmentId} departmentName={departmentName} productName={productName} />

      <ProductSkuDetails
        bigTicketGroupUpcType={bigTicketGroupUpcType}
        orderGroup={orderGroup}
        isWnmEligible={isWnmEligible}
        divisionId={divisionId}
      />

      <Grid container sx={{ marginBottom: (theme) => theme.spacing(3) }}>
        <Grid item md={6}>
          <ProductUids upcNumber={upcNumber} webId={webId} skuId={skuId} skuName={skuName} />

          {!!productComponents?.length && (
            <Collapsable closedTitle={VEIW_ALL_SKUS} openedTitle={COLLAPSE_ALL_SKUS}>
              <ProductComponentsSkus components={productComponents} />
            </Collapsable>
          )}
        </Grid>

        <Grid item md={6}>
          <Grid item md={12} sx={{ marginBottom: (theme) => theme.spacing(1) }}>
            <ProductPrices
              divisionId={divisionId}
              productPrice={productPrice?.[0]}
              billingPlans={billingPlans}
              dotComPrice={dotComPrice}
            />
          </Grid>

          {productUrl && (
            <DotComProductLink
              productUrl={productUrl}
              division={divisionId}
              mcomBaseUrl={mcomLink}
              bcomBaseUrl={bcomLink}
            />
          )}
        </Grid>
      </Grid>

      {isWithDynamicAttribues && (
        <>
          <Divider sx={{ width: '100%' }} />

          {/* TODO: check size and continue */}
          <ProductDynamicAttributes
            upcNumber={upcNumber}
            colormap={colormap}
            productUpcs={productUpcs}
            productDynamicAttributes={productDynamicAttributes}
          />
        </>
      )}
      <VerticalGridContainer>
        <ProductQuanityWrapper md={6}>
          <ProductQuanity value={productQty} onValueChange={onProductQuantityChange} />
        </ProductQuanityWrapper>

        {isCustomerAssemblyRequired && (
          <MarginBothGridContainer item md={12}>
            <Typography variant="body2" gutterBottom>
              {ASSEMBLY_REQUIRED}
            </Typography>
          </MarginBothGridContainer>
        )}

        <Grid item md={6} pt={2}>
          <ProductZipcode defaultZipcode={zipCode} onSubmit={onZipCodeSubmit} />
        </Grid>
      </VerticalGridContainer>

      <Grid item md={12}>
        {/*  TODO: Will be mapped the exact object and refactor the props once API changes are done */}
        <ProductAvailabilityDetails availabilityDetails={productAvailabledetails} />
      </Grid>
      {isDeliveryMethodsLoading ? (
        <CircularProgress sx={(theme) => ({ marginBottom: theme.spacing(6) })} />
      ) : !!deliveryMethods?.length ? (
        <Box sx={(theme) => ({ marginBottom: theme.spacing(6) })}>
          <ProductDeliveryMethods deliveryMethods={deliveryMethods} />
        </Box>
      ) : null}

      {/* TODO: Change for this Suspense component, when it will be suppoerted for ssr */}
      {/* <Suspense fallback={<CircularProgress />}>
        {!!deliveryMethods?.length && <ProductDeliveryMethods deliveryMethods={deliveryMethods} />}
      </Suspense> */}

      <Accordion title="Dimension" sx={{ width: '100%' }}>
        <ProductDimensions data={productDimensionData} />
      </Accordion>

      <Divider sx={{ width: '100%' }} />
      <Accordion title="Product Details" sx={{ width: '100%' }}>
        <ProductDescription
          data={productDescriptionValues}
          longDesc={productLongDesc?.value}
          departmentId={departmentId}
          departmentName={departmentName}
          vendorStyle={vendorStyle}
          vendorId={vendorId}
          vendorName={vendorName}
        />
      </Accordion>

      <Divider sx={{ width: '100%' }} />
      <Accordion title="References" sx={{ width: '100%' }}>
        <Schematics
          divisionNumber={divisionId}
          macysSchematicLink={macysSchematicLink}
          blmSchematicLink={blmSchematicLink}
        />
      </Accordion>
    </Grid>
  );
};

export default ProductDetails;
