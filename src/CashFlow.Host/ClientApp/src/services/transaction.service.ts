import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from './../models/transaction';

const listQuery = gql`
  query getTransactions($financialYearId: GUID!) {
    transactions(financialYearId: $financialYearId) {
      id
      evidenceNumber
      accountId
      supplierId
      dateCreated
      dateModified
      amountInCents
      isInternalTransfer
      description
      comment
      financialYear {
        id
        name
      }
      codes {
        codeName
      }
    }
  }`;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private apollo: Apollo) { }

  getTransactions<T extends Transaction>(financialYearId: string): Observable<T[]> {
    return this.apollo
      .watchQuery<any>({
        query: listQuery,
        variables: { financialYearId: financialYearId }
      })
      .valueChanges.pipe(map(({ data }) => data.transactions));
  }
}